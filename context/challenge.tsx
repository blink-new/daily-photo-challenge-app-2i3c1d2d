
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export type Challenge = {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  theme: string;
  image_url: string;
};

export type Submission = {
  id: string;
  user_id: string;
  challenge_id: string;
  image_url: string;
  caption: string;
  created_at: string;
  likes_count: number;
  username?: string;
  avatar_url?: string;
};

type ChallengeContextType = {
  currentChallenge: Challenge | null;
  challenges: Challenge[];
  submissions: Submission[];
  userSubmissions: Submission[];
  loadingChallenges: boolean;
  loadingSubmissions: boolean;
  fetchChallenges: () => Promise<void>;
  fetchCurrentChallenge: () => Promise<void>;
  fetchSubmissions: (challengeId: string) => Promise<void>;
  fetchUserSubmissions: (userId: string) => Promise<void>;
  submitPhoto: (challengeId: string, imageUrl: string, caption: string) => Promise<void>;
  likeSubmission: (submissionId: string) => Promise<void>;
  error: string | null;
};

const ChallengeContext = createContext<ChallengeContextType>({
  currentChallenge: null,
  challenges: [],
  submissions: [],
  userSubmissions: [],
  loadingChallenges: false,
  loadingSubmissions: false,
  fetchChallenges: async () => {},
  fetchCurrentChallenge: async () => {},
  fetchSubmissions: async () => {},
  fetchUserSubmissions: async () => {},
  submitPhoto: async () => {},
  likeSubmission: async () => {},
  error: null,
});

export const useChallenge = () => useContext(ChallengeContext);

export const ChallengeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [userSubmissions, setUserSubmissions] = useState<Submission[]>([]);
  const [loadingChallenges, setLoadingChallenges] = useState(false);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchChallenges = async () => {
    try {
      setLoadingChallenges(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .order('start_date', { ascending: false });
      
      if (error) throw error;
      
      setChallenges(data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoadingChallenges(false);
    }
  };

  const fetchCurrentChallenge = async () => {
    try {
      setLoadingChallenges(true);
      setError(null);
      
      const now = new Date().toISOString();
      
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .lte('start_date', now)
        .gte('end_date', now)
        .order('start_date', { ascending: false })
        .limit(1)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          // No current challenge found
          setCurrentChallenge(null);
          return;
        }
        throw error;
      }
      
      setCurrentChallenge(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoadingChallenges(false);
    }
  };

  const fetchSubmissions = async (challengeId: string) => {
    try {
      setLoadingSubmissions(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('submissions')
        .select(`
          *,
          profiles:user_id (username, avatar_url)
        `)
        .eq('challenge_id', challengeId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Transform the data to match our Submission type
      const formattedSubmissions = data.map((submission: any) => ({
        ...submission,
        username: submission.profiles?.username,
        avatar_url: submission.profiles?.avatar_url,
      }));
      
      setSubmissions(formattedSubmissions || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  const fetchUserSubmissions = async (userId: string) => {
    try {
      setLoadingSubmissions(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('submissions')
        .select(`
          *,
          challenges:challenge_id (title)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setUserSubmissions(data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  const submitPhoto = async (challengeId: string, imageUrl: string, caption: string) => {
    try {
      setError(null);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('submissions')
        .insert([{
          user_id: user.id,
          challenge_id: challengeId,
          image_url: imageUrl,
          caption,
          created_at: new Date().toISOString(),
        }]);
      
      if (error) throw error;
      
      // Refresh submissions after adding a new one
      await fetchSubmissions(challengeId);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const likeSubmission = async (submissionId: string) => {
    try {
      setError(null);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('User not authenticated');
      
      // Check if user already liked this submission
      const { data: existingLike, error: checkError } = await supabase
        .from('likes')
        .select('*')
        .eq('user_id', user.id)
        .eq('submission_id', submissionId)
        .single();
      
      if (checkError && checkError.code !== 'PGRST116') throw checkError;
      
      if (existingLike) {
        // Unlike
        const { error: unlikeError } = await supabase
          .from('likes')
          .delete()
          .eq('id', existingLike.id);
        
        if (unlikeError) throw unlikeError;
      } else {
        // Like
        const { error: likeError } = await supabase
          .from('likes')
          .insert([{
            user_id: user.id,
            submission_id: submissionId,
          }]);
        
        if (likeError) throw likeError;
      }
      
      // Update the likes count in the submissions state
      setSubmissions(prev => 
        prev.map(submission => {
          if (submission.id === submissionId) {
            return {
              ...submission,
              likes_count: existingLike 
                ? submission.likes_count - 1 
                : submission.likes_count + 1
            };
          }
          return submission;
        })
      );
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <ChallengeContext.Provider 
      value={{ 
        currentChallenge, 
        challenges, 
        submissions, 
        userSubmissions,
        loadingChallenges, 
        loadingSubmissions, 
        fetchChallenges, 
        fetchCurrentChallenge, 
        fetchSubmissions, 
        fetchUserSubmissions,
        submitPhoto, 
        likeSubmission, 
        error 
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};
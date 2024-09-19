import { API_URL } from '@/constants/api';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import VideoPreview from './VideoPreview';
import Link from 'next/link';

interface Stats {
  id: string;
  title: string;
  description: string;
  date: string;
  episodeLink: string;
}

const RecentEpisodes: React.FC = () => {
  const [episodeLinks, setEpisodeLinks] = useState<Stats[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/v1/api/get-episode-stats`);
        setEpisodeLinks(data.stats.episodeLinks || []);
      } catch (err) {
        setError('Failed to fetch episodes');
        toast.error('Failed to fetch episodes');
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  const handleEpisodeClick = (episodeId: string) => {
    localStorage.setItem('episodeIdToSelect', episodeId);
  };

  if (loading) {
    return <div className="loader mt-20 mx-auto ease-linear rounded-full border-4 border-t-4 h-12 w-12 animate-spin" />;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="mt-16 pb-5 mx-8">
      <h2 className="text-2xl font-bold mb-4 text-secondary-dark text-center">Recent Episodes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {episodeLinks.map((episode, index) => (
          <div key={episode.id} className="relative shadow-3xl pb-2 rounded-2xl">
            <VideoPreview
              videoLink={episode.episodeLink}
              title={episode.title || `Episode ${episodeLinks.length - index}`}
              episodeId={episode.id}
            />
            <Link href={`/episode/${episode.id}`} onClick={() => handleEpisodeClick(episode.id)}>
              <p className="block mt-2 text-secondary font-semibold text-lg text-center hover:underline">
                {`View details for Episode ${episodeLinks.length - index}`}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentEpisodes;
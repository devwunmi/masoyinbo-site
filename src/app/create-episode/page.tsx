"use client"
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useRouter } from "next/navigation";
import { API_URL } from "@/constants/api";
import { episodeSchema } from "@/validationSchema/episodeSchema";
import toast from "react-hot-toast";

interface Participant {
  _id: string;
  fullName: string;
}

interface Episode {
  participant_id: string;
}

const CreateEpisodeForm = () => {
  const participantsURL = `${API_URL}/v1/api/get-participants`;
  const episodesURL = `${API_URL}/v1/api/get-episode-stats`;
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [existingEpisodes, setExistingEpisodes] = useState<Episode[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useRouter();

  useEffect(() => {
    const fetchParticipantsAndEpisodes = async () => {
      try {
        const participantData = await axios.get(participantsURL);
        const episodeData = await axios.get(episodesURL);
        setParticipants(participantData.data.data);
        setExistingEpisodes(episodeData.data.episodes || []);
      } catch (error) {
        toast.error("Failed to load participants or episodes");
      }
    };

    fetchParticipantsAndEpisodes();
  }, []);

  const formik = useFormik({
    initialValues: {
      episodeLink: "",
      participant_id: "",
      amountWon: 0,
      episodeDate:"",
    },
    validationSchema: episodeSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setError(null);

      const storedUser = localStorage.getItem("user");
      const userId = storedUser ? JSON.parse(storedUser)._id : null;
      if (!userId) {
        toast.error("User is not logged in.");
        setSubmitting(false);
        return;
      }

      try {
        const response = await axios.post(`${API_URL}/v1/api/create-episode`, {
          ...values,
          createdBy: userId,
        });
        console.log("response", response)
        const episodeId = response.data.episode._id;
        localStorage.setItem("episodeId", episodeId);
        resetForm();
        navigate.push('/episode-events')
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "An unexpected error occurred");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Check if the selected participant already has an episode
  const participantHasEpisode = (participantId: string) => {
    return existingEpisodes.some(
      (episode) => episode.participant_id === participantId
    );
  };

  return (
    <>
      <main className="flex justify-center items-center py-10 px-4">
        <div className=" w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl transition-all duration-300 shadow-lg p-6 rounded">
          <h1 className="text-2xl font-bold mb-6 text-secondary-saffronLight text-center">Create New Episode</h1>

          {error && <div className="text-red-500">{error}</div>}

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="episodeLink" className="block text-base font-medium text-gray-400">
                Episode Link
              </label>
              <input
                type="text"
                name="episodeLink"
                value={formik.values.episodeLink}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="https://example.com"
                className="mt-1 py-4 p-2 block w-full outline-none border border-yellow-300 rounded-lg focus:ring focus:ring-yellow-200"
              />
              {formik.errors.episodeLink && formik.touched.episodeLink ? (
                <div className="text-red-500 text-base">{formik.errors.episodeLink}</div>
              ) : null}
            </div>

            <div>
              <label htmlFor="participant_id" className="block text-base font-medium text-gray-400">
                Participant
              </label>
              <select
                name="participant_id"
                value={formik.values.participant_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 py-4 block w-full p-2 outline-none border border-yellow-300 rounded-lg focus:ring focus:ring-yellow-200"
              >
                <option value="">Select participant</option>
                {participants.map((participant) => (
                  <option key={participant._id} value={participant._id}>
                    {participant.fullName}
                  </option>
                ))}
              </select>
              {formik.errors.participant_id && formik.touched.participant_id ? (
                <div className="text-red-500 text-base">{formik.errors.participant_id}</div>
              ) : null}
            </div>

            <div>
              <label htmlFor="amountWon" className="block text-base font-medium text-gray-400">
                Amount Won
              </label>
              <input
                type="number"
                name="amountWon"
                value={formik.values.amountWon}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 py-4 p-2 block w-full outline-none border border-yellow-300 rounded-lg focus:ring focus:ring-yellow-200"
              />
              {formik.errors.amountWon && formik.touched.amountWon ? (
                <div className="text-red-500 text-base">{formik.errors.amountWon}</div>
              ) : null}
            </div>
            <div>
              <label htmlFor="episodeDate" className="block text-base font-medium text-gray-400">
                Episode Date
              </label>
              <input
                name="episodeDate"
                value={formik.values.episodeDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 py-4 p-2 block w-full outline-none border border-yellow-300 rounded-lg focus:ring focus:ring-yellow-200"
              />
              {formik.errors.episodeDate && formik.touched.episodeDate ? (
                <div className="text-red-500 text-base">{formik.errors.episodeDate}</div>
              ) : null}
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-4 text-lg font-bold bg-secondary-saffron text-white p-2 rounded-md"
                disabled={
                  formik.isSubmitting || participantHasEpisode(formik.values.participant_id)
                }
              >
                {formik.isSubmitting ? "Creating..." : participantHasEpisode(formik.values.participant_id) ? "Participant Already Has an Episode" : "Create Episode"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default CreateEpisodeForm;

"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from '@/constants/api';
import { Users } from "@/types";
import Loading from "@/components/UI/Loading";

const ParticipationUsers = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/auth/users`);
        if (data.users) {
          setUsers(data.users);
        } else {
          console.error("No users found in the response");
        }
      } catch (error) {
        console.error("Error fetching users", error);
      }finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  if (loading) return <div className='min-h-screen flex justify-center'><Loading /></div>;

  return (
    <main className="p-4 h-screen">
      <h1 className="text-2xl font-bold text-center mb-8 mt-8 dark:text-neutral-200">All Users</h1>

      {/* Mobile and Tablet View (870px and below) */}
      <div className="block max-[870px]:block custom:hidden">
        <div className="flex flex-col gap-6">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user._id}
                className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md transition-all duration-500 hover:bg-gray-200 dark:bg-[rgba(255,255,255,0.1)] dark:text-neutral-200 dark:backdrop-blur-lg dark:bg-opacity-10"
              >
                {/* Name and Status in one row for mobile */}
                <div className="flex justify-between items-center w-full">
                  <div>
                    <h2 className="font-semibold">Name</h2>
                    <p>{user.fullName}</p>
                  </div>
                </div>

                {/* Other details below for mobile */}
                <div className="flex flex-col gap-4 bg-gray-100 border border-gray-300 shadow-md  hover:bg-gray-200 dark:bg-[rgba(255,255,255,0.1)] dark:text-neutral-200 dark:backdrop-blur-lg dark:bg-opacity-10 p-3 rounded-lg w-full mt-4 pl-10">
                  <div className="flex gap-1">
                    <h2 className="font-semibold">Email:</h2>
                    <p>{user.email}</p>
                  </div>
                  <div className="flex gap-1">
                    <h2 className="font-semibold">Username:</h2>
                    <p>{user.username}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-secondary-dark">No users data available.</p>
          )}
        </div>
      </div>

      {/* Desktop View (Above 934.44px) */}
      <div className="hidden custom:block">
        <div className="flex flex-col gap-6">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user._id}
                className="flex flex-col md:flex-row lg:justify-around md:justify-between md:items-center p-4 bg-gray-100 border dark:bg-[rgba(255,255,255,0.1)] dark:text-neutral-200 dark:backdrop-blur-lg dark:bg-opacity-10 rounded-lg border-gray-300 shadow-md  hover:bg-gray-200"
              >
                {/* Name and Email */}
                <div className="flex flex-col md:flex-row gap-20">
                  <div>
                    <h2 className="font-semibold">Name</h2>
                    <p>{user.fullName}</p>
                  </div>
                  <div>
                    <h2 className="font-semibold">Email</h2>
                    <p>{user.email}</p>
                  </div>
                  <div>
                    <h2 className="font-semibold">Username</h2>
                    <p>{user.username}</p>
                  </div>
                </div>

                {/* Role */}
                <div className="flex flex-col md:flex-row gap-8">
                  <div>
                    <h2 className="font-semibold">Role</h2>
                    <p>{user.role}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-secondary-dark">No users data available.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default ParticipationUsers;

// OpportunityCard.tsx
import React, { useState } from 'react';
import { Grant } from '../types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import {Avatar} from "./Avatar.tsx";

interface GrantCardProps {
  grant: Grant;
  onLike: (id: number, feedback?: string) => void;
  onDislike: (id: number, feedback?: string) => void;
}

const OpportunityCard: React.FC<GrantCardProps> = ({ grant, onLike, onDislike }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [currentAction, setCurrentAction] = useState<'like' | 'dislike' | null>(null);

  const handleButtonClick = (action: 'like' | 'dislike') => {
    setCurrentAction(action);
    setIsPopupVisible(true);
  };

  const handleSaveFeedback = () => {
    if (currentAction === 'like') {
      onLike(grant.id, feedback);
    } else if (currentAction === 'dislike') {
      onDislike(grant.id, feedback);
    }
    setIsPopupVisible(false);
    setFeedback('');
  };

  return (
    <div className=" flex flex-col gap-2 border rounded-lg p-4 shadow-md min-w-96">
      <div className="flex justify-between">
        <Avatar size="L" name={grant.companyName} />
        <div className="flex gap-2">
          <button className="border border-gray-400 text-gray-400" onClick={() => handleButtonClick('like')}>
            <FontAwesomeIcon icon={faThumbsUp}/>
          </button>
          <button className="border border-gray-400 text-gray-400" onClick={() => handleButtonClick('dislike')}>
            <FontAwesomeIcon icon={faThumbsDown}/>
          </button>
        </div>
      </div>
      <div className="text-xs font-bold">{grant.companyName}</div>
      <div className="text-xl font-semibold">{grant.title}</div>
      <div className="flex gap-2">
        <div className="w-1/2 bg-rose-50 text-gray-600 p-3 rounded font-semibold flex flex-col items-center justify-center"><span
          className="text-orange-500 text-lg ">${grant.avgAmount}</span>
          <div>Avg amount</div>
        </div>
        <div className="w-1/2 bg-gray-100 p-3 rounded flex flex-col items-center">
          <div className="flex flex-col"><span>Deadline</span> <span className="font-bold">
          {dayjs(grant.deadlineDate).format("MMMM DD")}
          </span></div>
          <hr className="w-full"/>
          <div className="flex flex-col"><span>Getting started</span> <span className="font-bold">
            Apply online
          </span></div>
        </div>
      </div>
      <div className="flex justify-between text-lg text-gray-600">Location <span>{grant.location}</span></div>
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Enter Feedback</h2>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mb-4"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter your feedback (optional)"
            />
            <div className="flex justify-end gap-2">
              <button className="bg-gray-500 text-white py-2 px-4 rounded" onClick={() => setIsPopupVisible(false)}>Cancel</button>
              <button className="bg-green-600 text-white py-2 px-4 rounded" onClick={handleSaveFeedback}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpportunityCard;

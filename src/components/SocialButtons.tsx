import React from 'react';
import { Bell, ThumbsUp, Youtube } from 'lucide-react';

interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon, label }) => {
  return (
    <div className="bg-red-600 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-red-700 transition-colors duration-200">
      {icon}
      <span>{label}</span>
    </div>
  );
};

export const SocialButtons: React.FC = () => {
  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center items-center gap-4">
      <SocialButton icon={<ThumbsUp size={24} />} label="Like" />
      <SocialButton icon={<Bell size={24} />} label="Subscribe" />
      <SocialButton icon={<Youtube size={24} />} label="Share" />
    </div>
  );
};
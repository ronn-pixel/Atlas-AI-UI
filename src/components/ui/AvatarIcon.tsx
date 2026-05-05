import { User } from 'lucide-react';
import { cn } from '@/utils/cn';
import React from 'react';

interface AvatarIconProps {
  gender?: string;
  className?: string;
  iconClassName?: string;
  seedString?: string;
}

export function AvatarIcon({ gender, className, iconClassName, seedString }: AvatarIconProps) {
  const g = (gender || '').toUpperCase();
  const isMale = g === 'MALE' || g === 'M';
  const isFemale = g === 'FEMALE' || g === 'F';

  // Deterministically generate a number between 1 and 99 based on seedString
  let seedNumber = 1;
  if (seedString) {
    let hash = 0;
    for (let i = 0; i < seedString.length; i++) {
      hash = seedString.charCodeAt(i) + ((hash << 5) - hash);
    }
    seedNumber = (Math.abs(hash) % 99) + 1;
  } else {
    // default fallbacks if no seed
    seedNumber = isFemale ? 44 : isMale ? 32 : 12;
  }

  const femaleAvatar = `https://randomuser.me/api/portraits/women/${seedNumber}.jpg`;
  const maleAvatar = `https://randomuser.me/api/portraits/men/${seedNumber}.jpg`;
  const neutralAvatar = `https://randomuser.me/api/portraits/lego/${seedNumber % 10}.jpg`; // Fallback for strict neutral, though randomuser usually gives male/female

  let imageSrc = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80";
  if (isFemale) imageSrc = femaleAvatar;
  else if (isMale) imageSrc = maleAvatar;
  else imageSrc = `https://randomuser.me/api/portraits/${seedNumber % 2 === 0 ? 'men' : 'women'}/${seedNumber}.jpg`;

  return (
    <div className={cn("flex items-center justify-center bg-slate-100 dark:bg-slate-800 shrink-0 overflow-hidden", className)}>
       <img 
         src={imageSrc} 
         alt={`${gender} avatar`}
         className={cn("w-full h-full object-cover", iconClassName)}
         referrerPolicy="no-referrer"
       />
    </div>
  );
}

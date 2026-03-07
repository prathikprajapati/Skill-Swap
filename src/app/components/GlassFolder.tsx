"use client";

import React from "react";
import { cn } from "@/lib/utils";

type GlassFolderProps = {
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  label?: string;
};

const GlassFolder: React.FC<GlassFolderProps> = ({ icon, className, onClick, label }) => {
  return (
    <section
      className={cn(
        "relative group flex flex-col items-center justify-center",
        className
      )}
      onClick={onClick}
    >
      <div className="relative w-60 h-40 cursor-pointer origin-bottom [perspective:1500px] z-10">
        {/* Top tab with glass effect */}
        <div
          className="backdrop-blur-xl w-full h-full origin-top rounded-2xl rounded-tl-none 
          group-hover:shadow-[0_20px_40px_rgba(0,0,0,.2)] transition-all ease duration-300 relative 
          after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-20 after:h-4 after:backdrop-blur-xl after:rounded-t-2xl 
          before:absolute before:content-[''] before:-top-[15px] before:left-[75.5px] before:w-4 before:h-4 before:backdrop-blur-xl before:[clip-path:polygon(0_35%,0%_100%,50%_100%);]"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(37, 99, 235, 0.2) 100%)',
            borderTop: '1px solid rgba(147, 197, 253, 0.3)',
            borderLeft: '1px solid rgba(147, 197, 253, 0.2)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Top edge light streak */}
          <div 
            className="absolute top-0 left-4 right-4 h-[1px] rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
              boxShadow: '0 0 10px rgba(147, 197, 253, 0.5)',
            }}
          />
        </div>

        {/* Folder layers with glass effect - stacked and offset */}
        <div 
          className="absolute inset-1 backdrop-blur-xl rounded-2xl transition-all ease duration-300 origin-bottom select-none group-hover:[transform:rotateX(-20deg)]"
          style={{ 
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.1) 100%)',
            border: '1px solid rgba(147, 197, 253, 0.15)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          }}
        />
        <div 
          className="absolute inset-1 backdrop-blur-xl rounded-2xl transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-30deg)]"
          style={{ 
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(37, 99, 235, 0.08) 100%)',
            border: '1px solid rgba(147, 197, 253, 0.1)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
          }}
        />
        <div 
          className="absolute inset-1 backdrop-blur-xl rounded-2xl transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-38deg)]"
          style={{ 
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.06) 100%)',
            border: '1px solid rgba(147, 197, 253, 0.08)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
          }}
        />

        {/* Front folder layer with icon - main glass panel */}
        <div
          className="absolute bottom-0 backdrop-blur-xl w-full h-[156px] rounded-2xl rounded-tr-none 
          after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-[146px] after:h-[16px] after:backdrop-blur-xl after:rounded-t-2xl 
          before:absolute before:content-[''] before:-top-[10px] before:right-[142px] before:size-3 before:backdrop-blur-xl before:[clip-path:polygon(100%_14%,50%_100%,100%_100%);] 
          transition-all ease duration-300 origin-bottom flex items-center justify-center 
          group-hover:shadow-[inset_0_20px_40px_rgba(100,149,237,0.3),inset_0_-20px_40px_rgba(65,105,225,0.2),0_20px_60px_rgba(0,0,0,0.15)] 
          group-hover:[transform:rotateX(-46deg)_translateY(1px)]"
          style={{
            background: 'linear-gradient(180deg, rgba(96, 165, 250, 0.25) 0%, rgba(59, 130, 246, 0.2) 50%, rgba(37, 99, 235, 0.15) 100%)',
            borderTop: '1px solid rgba(147, 197, 253, 0.25)',
            borderRight: '1px solid rgba(147, 197, 253, 0.2)',
            borderBottom: '1px solid rgba(30, 64, 175, 0.1)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 8px 32px rgba(0, 0, 0, 0.12)',
          }}
        >
          {/* Inner glow at top */}
          <div 
            className="absolute top-1 left-2 right-2 h-[2px] rounded-full opacity-60"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
            }}
          />
          <div style={{ color: 'rgba(255, 255, 255, 0.9)' }} className="text-4xl drop-shadow-md">
            {icon}
          </div>
        </div>
      </div>
      {label && (
        <span 
          className="mt-4 text-lg font-medium group-hover:opacity-100 transition-opacity" 
          style={{ color: 'rgba(255, 255, 255, 0.7)' }}
        >
          {label}
        </span>
      )}
    </section>
  );
};

export default GlassFolder;

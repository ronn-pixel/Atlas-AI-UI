import * as React from 'react';
import { Facebook, Linkedin, Twitter, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="shrink-0 border-t border-border-subtle px-6 w-full h-[60px] flex items-center justify-between text-text-muted text-[10px] uppercase font-black tracking-widest bg-bg-app">
      <div className="flex items-center justify-between gap-4 w-full overflow-hidden">
        <div className="flex-1 text-left opacity-70 truncate min-w-0 hidden md:block">
          &copy; 2026 Atlas AI. All Rights Reserved.
        </div>
        <div className="flex-1 text-center md:text-center text-left opacity-80 min-w-0 truncate">
          Enterprise Insurance Intelligence Platform
        </div>
        <div className="flex-1 flex items-center justify-end gap-4 min-w-0">
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="hover:text-accent transition-colors"><Facebook className="w-[14px] h-[14px]" /></a>
            <a href="#" className="hover:text-accent transition-colors"><Linkedin className="w-[14px] h-[14px]" /></a>
            <a href="#" className="hover:text-accent transition-colors"><svg viewBox="0 0 24 24" aria-hidden="true" className="w-[14px] h-[14px] fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg></a>
            <a href="mailto:support@atlasai.com" className="hover:text-accent transition-colors"><Mail className="w-[14px] h-[14px]" /></a>
          </div>
          <span className="w-px h-3 bg-border-subtle shrink-0 hidden sm:block" />
          <div className="hover:text-accent transition-colors cursor-pointer truncate shrink-0 hidden sm:block">
            support@atlasai.com
          </div>
        </div>
      </div>
    </footer>
  );
};

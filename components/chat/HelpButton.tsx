'use client'

interface HelpButtonProps {
  onClick: () => void
}

export const HelpButton = ({ onClick }: HelpButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="help-button"
      aria-label="Get help from AI assistant"
      type="button"
    >
      <svg 
        width="18" 
        height="18" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
      <span>Help</span>
      
      <style jsx>{`
        .help-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, #7c3aed 0%, #9333ea 100%);
          color: white;
          border: none;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 14px 0 rgba(124, 58, 237, 0.39);
          position: relative;
          overflow: hidden;
          animation: pulse 2s infinite;
        }
        
        .help-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }
        
        .help-button:hover::before {
          left: 100%;
        }
        
        .help-button:hover {
          background: linear-gradient(135deg, #6d28d9 0%, #7e22ce 100%);
          box-shadow: 0 6px 20px 0 rgba(124, 58, 237, 0.5);
          transform: translateY(-2px);
        }
        
        .help-button:active {
          transform: translateY(0);
          box-shadow: 0 2px 10px 0 rgba(124, 58, 237, 0.3);
        }
        
        .help-button svg {
          flex-shrink: 0;
        }
        
        .help-button span {
          position: relative;
          z-index: 1;
        }
        
        @media (max-width: 768px) {
          .help-button span {
            display: none;
          }
          
          .help-button {
            padding: 0.5rem;
            width: 36px;
            height: 36px;
            justify-content: center;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .help-button {
            animation: none;
            transition: none;
          }
          
          .help-button::before {
            transition: none;
          }
          
          .help-button:hover {
            transform: none;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 4px 14px 0 rgba(124, 58, 237, 0.39);
          }
          50% {
            box-shadow: 0 4px 20px 0 rgba(124, 58, 237, 0.6);
          }
        }
      `}</style>
    </button>
  )
}

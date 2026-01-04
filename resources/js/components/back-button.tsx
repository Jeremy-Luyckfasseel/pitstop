import { ArrowLeft } from 'lucide-react';
import { useCallback } from 'react';

interface BackButtonProps {
    fallbackUrl?: string;
    className?: string;
    children?: React.ReactNode;
}

/**
 * A back button that uses browser history navigation.
 * Falls back to a specified URL if there's no history.
 */
export function BackButton({ 
    fallbackUrl = '/', 
    className = '',
    children = 'Go Back'
}: BackButtonProps) {
    const handleClick = useCallback(() => {
        // Check if we have history to go back to
        if (window.history.length > 1) {
            window.history.back();
        } else {
            // Fallback to the specified URL
            window.location.href = fallbackUrl;
        }
    }, [fallbackUrl]);

    return (
        <button
            onClick={handleClick}
            className={`inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white ${className}`}
        >
            <ArrowLeft className="h-4 w-4" />
            {children}
        </button>
    );
}

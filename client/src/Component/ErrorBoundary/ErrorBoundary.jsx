import { useState, useEffect } from "react";

function ErrorBoundary({ children }) {
    const [hasError, setHasError] = useState(false);
    const fallback = <div className="vh-100 flex items-center justify-start">
        <h1 className="w-1/2 p-2 bg-red-400 text-white font-bold">Something went wrong.</h1>
    </div>
    useEffect(() => {
        setHasError(false);
    }, [children]);

    try {
        if (hasError) return fallback;
        return children;
    } catch (error) {
        setTimeout(() => setHasError(true), 0); 
        return fallback || <h1>{error.message}</h1>;
    }
}

export default ErrorBoundary;

import { useContext } from 'react';
import { SessionContext } from '@h4a/core/context/SessionContextProvider';

const useSessionId = () => {
    const { sessionId } = useContext(SessionContext);
    return sessionId;
};

export default useSessionId;

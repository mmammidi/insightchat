import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message }) => {
  const { text, sender, timestamp, isError, citations = [], sources = [] } = message;
  
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Check if the response indicates information was not found in context
  const isNotFoundResponse = (text) => {
    if (!text) return false;
    
    const notFoundPatterns = [
      /I don't have (any )?information/i,
      /I couldn't find/i,
      /I cannot find/i,
      /no information available/i,
      /not found in (the )?context/i,
      /I don't know/i,
      /I'm not sure/i,
      /I do not have/i,
      /I wasn't able to find/i,
      /unable to find/i,
      /doesn't (appear to )?contain/i,
      /does not contain/i,
      /not available in (the )?context/i,
      /no relevant information/i,
      /can't provide information/i,
      /cannot provide information/i
    ];
    
    return notFoundPatterns.some(pattern => pattern.test(text));
  };

  // Determine if sources should be shown
  const shouldShowSources = !isNotFoundResponse(text) && ((citations && citations.length > 0) || (sources && sources.length > 0));

  // Parse text and convert URLs to clickable links
  const renderTextWithLinks = (text) => {
    if (!text) return null;

    try {
      // Regular expression to match URLs
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      
      // Split text by URLs
      const parts = text.split(urlRegex);
      
      return parts.map((part, index) => {
        // Check if this part is a URL
        if (urlRegex.test(part)) {
          return (
            <a
              key={index}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="message-link"
            >
              {part}
            </a>
          );
        }
        return <span key={index}>{part}</span>;
      });
    } catch (error) {
      console.error('Error rendering text with links:', error);
      return <span>{text}</span>;
    }
  };

  return (
    <div className={`message ${sender} ${isError ? 'error' : ''}`}>
      <div className="message-content">
        {sender === 'bot' && (
          <div className="avatar bot-avatar">
            AI
          </div>
        )}
        <div className="message-bubble">
          <div className="message-text">
            {renderTextWithLinks(text)}
          </div>
          
          {/* Display citations if available and not a "not found" response */}
          {shouldShowSources && citations && citations.length > 0 && (
            <div className="citations">
              <div className="citations-title">Sources:</div>
              {citations.map((citation, idx) => (
                <div key={idx} className="citation-item">
                  <span className="citation-number">[{idx + 1}]</span>
                  {citation.url ? (
                    <a
                      href={citation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="citation-link"
                    >
                      {citation.title || citation.url}
                    </a>
                  ) : (
                    <span>{citation.title || citation.text}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Display sources if available (alternative format) and not a "not found" response */}
          {shouldShowSources && sources && sources.length > 0 && citations.length === 0 && (
            <div className="citations">
              <div className="citations-title">Sources:</div>
              {sources.map((source, idx) => {
                // Handle both string URLs and object sources
                const isObject = typeof source === 'object' && source !== null;
                const url = isObject ? source.url : source;
                const title = isObject ? (source.title || source.url) : source;
                const author = isObject ? source.author : null;
                
                return (
                  <div key={idx} className="citation-item">
                    <span className="citation-number">[{idx + 1}]</span>
                    {url ? (
                      <div>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="citation-link"
                        >
                          {title}
                        </a>
                        {author && <span className="citation-author"> by {author}</span>}
                      </div>
                    ) : (
                      <span>{title}</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <span className="message-time">{formatTime(timestamp)}</span>
        </div>
        {sender === 'user' && (
          <div className="avatar user-avatar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;


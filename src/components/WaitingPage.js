import React, { useState, useEffect } from 'react';

const WaitingPage = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    // Simulating continuous backend API updates
    const interval = setInterval(() => {
      setContent((prevContent) => [
        ...prevContent,
        `New content generated at ${new Date().toLocaleTimeString()}`,
      ]);
    }, 3000); // Fetches new content every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(to bottom, #3f51b5, #5a55ae)',
      color: '#ffffff',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
    },
    iconWrapper: {
      background: '#ffffff',
      padding: '20px',
      borderRadius: '10px',
      marginBottom: '20px',
    },
    icon: {
      fontSize: '48px',
      color: '#3f51b5',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      margin: '10px 0',
    },
    subtitle: {
      fontSize: '14px',
      marginBottom: '30px',
    },
    progressBar: {
      width: '50%',
      height: '10px',
      background: '#e0e0e0',
      borderRadius: '5px',
      overflow: 'hidden',
      marginBottom: '10px',
      position: 'relative',
    },
    progress: {
      width: '20%',
      height: '100%',
      background: 'linear-gradient(90deg, #6a9dfc, #4a7bfc)',
      borderRadius: '5px',
      position: 'absolute',
      animation: 'progressMove 2s linear infinite',
    },
    progressText: {
      fontSize: '12px',
      marginBottom: '20px',
    },
    contentContainer: {
      width: '50%',
      height: '300px',
      background: 'linear-gradient(90deg, #c9e5f9 , #f0fcff ) ',
      borderRadius: '10px',
      padding: '10px',
      overflowY: 'auto',
      color: '#000000',
    },
    contentItem: {
      marginBottom: '10px',
      fontSize: '14px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.iconWrapper}>
        <i style={styles.icon}>⏳</i>
      </div>
      <div style={styles.title}>Analyzing Answer Sheets – Insights Are on Their Way!</div>
      <div style={styles.subtitle}>Our system is evaluating responses to uncover key areas for improvement and success.</div>
      <div style={styles.progressBar}>
        <div style={styles.progress}></div>
      </div>
      <div style={styles.progressText}>Finalizing the analysis – valuable insights are moments away!</div>
      <div className="contentContainer" style={styles.contentContainer}>
        {content.map((item, index) => (
          <div key={index} style={styles.contentItem}>{item}</div>
        ))}
      </div>
      <style>{`
        @keyframes progressMove {
          0% {
            left: 0;
          }
          100% {
            left: 100%;
          }
        }

        /* Scrollbar styling */
        .contentContainer::-webkit-scrollbar {
          width: 8px; /* Scrollbar width */
        }

        .contentContainer::-webkit-scrollbar-thumb {
          background: #02104a ; /* Scrollbar thumb color */
          border-radius: 4px; /* Rounded corners */
        }

        .contentContainer::-webkit-scrollbar-thumb:hover {
          background: #5a55ae; /* Thumb hover color */
        }

        .contentContainer::-webkit-scrollbar-track {
          background: #e0e0e0; /* Scrollbar track color */
        }
      `}</style>
    </div>
  );
};

export default WaitingPage;

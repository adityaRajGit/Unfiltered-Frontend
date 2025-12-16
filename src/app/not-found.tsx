"use client";

import Link from "next/link";

export default function NotFound() {
  const handleMouseOver = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    target.style.backgroundColor = '#00695c';
    target.style.transform = 'translateY(-2px)';
    target.style.boxShadow = '0 6px 16px rgba(0, 137, 123, 0.4)';
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    target.style.backgroundColor = '#00897b';
    target.style.transform = 'translateY(0)';
    target.style.boxShadow = '0 4px 12px rgba(0, 137, 123, 0.3)';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 50%, #80deea 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '24px',
        padding: '60px 40px',
        textAlign: 'center',
        boxShadow: `
          0 20px 40px rgba(0, 150, 136, 0.15),
          0 8px 16px rgba(0, 150, 136, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.8)
        `,
        maxWidth: '500px',
        width: '100%',
        border: '1px solid rgba(179, 229, 252, 0.5)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '150px',
          height: '150px',
          background: 'rgba(178, 235, 242, 0.3)',
          borderRadius: '50%'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '100px',
          height: '100px',
          background: 'rgba(128, 222, 234, 0.3)',
          borderRadius: '50%'
        }}></div>
        
        <div style={{
          fontSize: '140px',
          fontWeight: '800',
          color: '#00897b',
          marginBottom: '20px',
          textShadow: '3px 3px 0 rgba(0, 137, 123, 0.1)',
          lineHeight: 1
        }}>
          404
        </div>
        
        <h2 style={{
          fontSize: '28px',
          fontWeight: '600',
          color: '#00695c',
          marginBottom: '16px'
        }}>
          Page Not Found
        </h2>
        
        <p style={{
          fontSize: '18px',
          color: '#4db6ac',
          lineHeight: '1.6',
          marginBottom: '32px',
          maxWidth: '400px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Oops! The page you&apos;re looking for seems to have drifted away like a leaf on water.
        </p>
        
        <Link
          href="/"
          style={{
            display: 'inline-block',
            padding: '14px 32px',
            backgroundColor: '#00897b',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '50px',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(0, 137, 123, 0.3)',
            border: '2px solid #00897b',
            position: 'relative',
            zIndex: 1
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
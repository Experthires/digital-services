import { useEffect } from 'react';

export const useSecurityMeasures = () => {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable text selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Disable copy
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable keyboard shortcuts for dev tools and copying
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 - Dev Tools
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+I - Dev Tools
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+J - Console
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+C - Inspect Element
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+U - View Source
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+S - Save
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+C - Copy
      if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+A - Select All
      if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+P - Print
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        return false;
      }
    };

    // Disable drag
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    // Disable print via window.print override
    const originalPrint = window.print;
    window.print = () => {};

    // Disable image dragging globally
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.setAttribute('draggable', 'false');
      img.style.pointerEvents = 'none';
    });

    // Apply CSS to disable selection
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';

    // Prevent opening in iframe (clickjacking)
    if (window.self !== window.top) {
      document.body.innerHTML = '';
      window.top!.location.href = window.self.location.href;
    }

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
      window.print = originalPrint;
      images.forEach(img => {
        img.removeAttribute('draggable');
        img.style.pointerEvents = '';
      });
    };
  }, []);
};

// Check if links are locked
export const areLinksLocked = (): boolean => {
  return localStorage.getItem('fiverr_links_locked') === 'true';
};

// Lock links permanently
export const lockLinks = (): void => {
  localStorage.setItem('fiverr_links_locked', 'true');
};

// Check if links have been set (any link exists)
export const hasLinksBeenSet = (): boolean => {
  const mainLink = localStorage.getItem('fiverr_affiliate_link');
  return !!mainLink && mainLink.trim() !== '';
};

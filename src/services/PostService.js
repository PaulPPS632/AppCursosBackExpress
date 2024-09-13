// api.js
export const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/Post/Screens/6bd8daa7-f7a8-41f0-acde-fcd172a57690');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };
  
async function getData() {
    try {
      const response = await fetch('/quests.json');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem fetching the data:", error);
      throw error;  // or you might return an error object or a default value
    }
  }
export default getData
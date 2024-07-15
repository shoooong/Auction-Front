import jwtAxios from 'pages/user/jwtUtil'; 
useEffect(() => {
  const fetchInquiry = async () => {
    try {
      const response = await jwtAxios.get(`http://localhost:80/inquiry/${inquiryId}`);
      setInquiry(response.data);
    } catch (error) {
      console.error('Error fetching inquiry:', error);
    }
  };

  fetchInquiry();
}, [inquiryId]);

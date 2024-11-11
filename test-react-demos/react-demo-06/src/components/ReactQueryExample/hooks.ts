import { useQuery } from '@tanstack/react-query'

export const fetchUserData = async () => {
  const response = await fetch('https://api.example.com/user/123');
  return response.json();
};

export const useProfile = () => {
  return useQuery({ 
    queryKey: ['userProfile'], 
    queryFn: fetchUserData
  })  
}



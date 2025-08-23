import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import AccommodationItem from './AccommodationItem';
import FilterDropdown from '../../restaurant/components/FilterDropdown';
import { useLocationStore } from '../../../stores/useLocationStore';

const ListContainer = styled.div`
  padding: 1rem;
  overflow-y: auto;
  height: calc(100vh - 250px);
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const LoadingText = styled.p`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
`;

const AccommodationList = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('거리순');

  const { locationId } = useLocationStore();

  useEffect(() => {
    if (locationId) {
      const fetchAccommodations = async () => {
        try {
          setIsLoading(true);
          
          const endpoint = `/locations/${locationId}/nearby-accommodation-all`;
          const fullUrl = `${import.meta.env.VITE_API_BASE_URL}${endpoint}`;

          const response = await axios.get(fullUrl, {
            params: { radius: 2000 },
            timeout: 10000,
          });

          setAccommodations(response.data);
          setError(null);
        } catch (err) {
          console.error("Error fetching accommodations:", err);
          setError("숙소 정보를 불러오는 데 실패했습니다.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchAccommodations();
    } else {
      setIsLoading(false);
      setAccommodations([]);
    }
  }, [locationId, selectedFilter]);

  if (!locationId) {
    return <LoadingText>위치 정보를 가져오는 중...</LoadingText>;
  }

  if (isLoading) {
    return <LoadingText>숙소 정보를 불러오는 중...</LoadingText>;
  }

  if (error) {
    return <LoadingText>{error}</LoadingText>;
  }

  return (
    <div>
        <FilterContainer>
            <FilterDropdown 
              selectedFilter={selectedFilter}
              onSelectFilter={setSelectedFilter}
            />
        </FilterContainer>
        <ListContainer>
            {accommodations.length > 0 ? (
                accommodations.map(item => (
                    <AccommodationItem key={item.id} accommodation={item} />
                ))
            ) : (
                <LoadingText>주변에 숙소가 없습니다.</LoadingText>
            )}
        </ListContainer>
    </div>
  );
};

export default AccommodationList;
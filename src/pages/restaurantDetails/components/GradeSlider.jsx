import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

const GradeSliderContainer = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  margin-top: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const SliderWrapper = styled.div`
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 20px;
  position: relative;
  touch-action: none;
`;

const SliderTrack = styled.div`
  position: absolute;
  height: 100%;
  left: 0;
  background-color: #5186f9;
  border-radius: 20px;
  transition: width 0.1s ease-out;
`;

const SliderThumb = styled.div`
  width: 20px;
  height: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: ${(props) => props.position}px;
  transform: translateX(-50%);
  cursor: grab;
  z-index: 1;
`;

const GradeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  padding: 0 1rem;
`;

const GradeLabel = styled.span`
  font-size: 0.9rem;
  color: #555;
`;

const gradePoints = ['E', 'D', 'C', 'B', 'A'];

const GradeSlider = ({ value, onChange }) => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const sliderRef = useRef(null);
  const isDragging = useRef(false);

  const updateGradeByPosition = (position) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const rect = slider.getBoundingClientRect();
    const stepWidth = rect.width / (gradePoints.length - 1);
    const gradeIndex = Math.round(position / stepWidth);
    const newGrade = gradePoints[gradeIndex];

    if (value !== newGrade) {
      onChange(newGrade);
    }
  };

  const handleDragStart = (e) => {
    isDragging.current = true;
    e.preventDefault();
  };

  const handleDragMove = (e) => {
    if (!isDragging.current) return;
    const slider = sliderRef.current;
    if (!slider) return;

    const rect = slider.getBoundingClientRect();
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    let newPosition = clientX - rect.left;
    newPosition = Math.max(0, Math.min(newPosition, rect.width));

    setSliderPosition(newPosition);
    updateGradeByPosition(newPosition);
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      const rect = slider.getBoundingClientRect();
      const gradeIndex = gradePoints.indexOf(value);
      if (gradeIndex !== -1) {
        const newPosition = (rect.width / (gradePoints.length - 1)) * gradeIndex;
        setSliderPosition(newPosition);
      }
    }

    const handleUp = () => handleDragEnd();
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('mouseup', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [value]);

  return (
    <GradeSliderContainer>
      <SectionTitle>추천 등급을 알려주세요</SectionTitle>
      <SliderWrapper 
        ref={sliderRef}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <SliderTrack style={{ width: `${sliderPosition}px` }} />
        <SliderThumb position={sliderPosition} />
      </SliderWrapper>
      <GradeLabels>
        {gradePoints.map((grade) => (
          <GradeLabel key={grade} style={{ fontWeight: grade === value ? 'bold' : 'normal' }}>
            {grade}
          </GradeLabel>
        ))}
      </GradeLabels>
    </GradeSliderContainer>
  );
};

export default GradeSlider;
import React from 'react'

const LocationSearchPanels = ({ activeField, suggestions, isLoading, error, onSelectSuggestion }) => {
  const title = activeField === 'pickup'
    ? 'Pickup suggestions'
    : activeField === 'destination'
      ? 'Destination suggestions'
      : 'Location suggestions';

  const handleClick = (suggestion) => {
    if (!activeField || !suggestion) return;
    onSelectSuggestion(activeField, suggestion);
  };

  return (
    <div className='p-2'>
      <div className='pb-3'>
        <h4 className='text-lg font-semibold'>{title}</h4>
        {error && <p className='text-sm text-red-600 mt-1'>{error}</p>}
      </div>

      {isLoading && (
        <div className='text-sm text-gray-500'>Searching for matching locations...</div>
      )}

      {!isLoading && suggestions?.length > 0 && (
        <div className='space-y-2'>
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion}-${index}`}
              onClick={() => handleClick(suggestion)}
              className='flex gap-4 border-2 border-gray-100 active:border-black p-3 rounded-xl my-2 items-center justify-start cursor-pointer hover:border-black'
            >
              <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'>
                <i className="ri-map-pin-fill"></i>
              </h2>
              <h4 className='font-medium'>{suggestion}</h4>
            </div>
          ))}
        </div>
      )}

      {!isLoading && !suggestions?.length && !error && activeField && (
        <div className='text-sm text-gray-500'>No suggestions found. Try a different address.</div>
      )}

      {!isLoading && !activeField && (
        <div className='text-sm text-gray-500'>Tap a field above to start searching pickup or destination locations.</div>
      )}
    </div>
  )
}

export default LocationSearchPanels


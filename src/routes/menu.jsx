import React, { useEffect, useState } from 'react';
import MenuCard from '../components/MenuCard';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { SnackbarProvider } from 'notistack';

function Menu() {
  const location = useLocation();
  const { hotel } = location.state || {};
  const [menulist, setMenuList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hotel?._id) {
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/menu?restaurant_id=${hotel._id}`)
        .then((response) => {
          setMenuList(response.data);
        })
        .catch((error) => {
          console.error('Error fetching menu:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [hotel]);

  const filteredMenu = menulist.filter((menu) =>
    menu.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <SnackbarProvider maxSnack={3}>
        {/* Restaurant Header Section */}
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-6 md:mb-0">
                <h1 className="text-4xl md:text-6xl font-bold font-ruge tracking-wide mb-2">
                  {hotel?.name || 'Restaurant Menu'}
                </h1>
                <p className="text-orange-100 text-lg md:text-xl">
                  Discover our delicious menu offerings
                </p>
                {hotel?.cuisine && (
                  <div className="mt-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-400 text-orange-900">
                      {hotel.cuisine}
                    </span>
                  </div>
                )}
              </div>
              
              {hotel?.image && (
                <div className="md:ml-8">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name} 
                    className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover shadow-lg border-4 border-white/20"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-8 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Explore Our Menu
              </h2>
              <p className="text-gray-600 text-lg">
                Find your favorite dishes and discover new flavors
              </p>
            </div>
            
            <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for dishes, ingredients, or categories..."
                  className="w-full px-6 py-4 pl-14 text-lg border-2 border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-300 focus:border-orange-400 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Items Section */}
        <section className="px-4 md:px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            {/* Results Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  Available Dishes
                </h3>
                <p className="text-gray-600">
                  {filteredMenu.length} dish{filteredMenu.length !== 1 ? 'es' : ''} found
                </p>
              </div>
              
              {searchTerm && (
                <div className="mt-4 md:mt-0">
                  <span className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                    Searching for: "{searchTerm}"
                  </span>
                </div>
              )}
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
                  <h4 className="text-xl font-semibold text-gray-600 mb-2">
                    Loading menu...
                  </h4>
                  <p className="text-gray-500">
                    Please wait while we fetch the delicious menu items
                  </p>
                </div>
              </div>
            )}

            {/* Menu Grid */}
            {!loading && filteredMenu.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8">
                {filteredMenu.map((menu) => (
                  <div key={menu._id} className="transform hover:scale-105 transition-transform duration-300">
                    <MenuCard menu={menu} />
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredMenu.length === 0 && (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <svg 
                    className="w-24 h-24 mx-auto text-gray-300 mb-6"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <h5 className="text-xl font-semibold text-gray-600 mb-2">
                    No dishes found
                  </h5>
                  <p className="text-gray-500 mb-4">
                    {searchTerm 
                      ? "Try adjusting your search terms or browse all available dishes"
                      : "This restaurant doesn't have any menu items available yet"
                    }
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Decorative Elements */}
        <div className="fixed top-20 right-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
        <div className="fixed bottom-20 left-10 w-40 h-40 bg-orange-300 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
      </SnackbarProvider>
    </div>
  );
}

export default Menu;

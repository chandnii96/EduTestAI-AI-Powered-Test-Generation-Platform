import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Search,
  Clock,
  CheckCircle,
  PlayCircle,
  X,
  ArrowLeft,
  Calendar,
  Target
} from 'lucide-react';

const TestHistorySidebar = ({ toggleSidebar, isOpen = true }) => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedTest, setSelectedTest] = useState(null);
  const [testDetails, setTestDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [view, setView] = useState('list');

  const navigate = useNavigate();

  const fetchTests = async (page = 1, search = '') => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        search: search
      });

      const response = await fetch(`http://localhost:5000/api/hist/get?${queryParams}`, {
        headers: {
          'Content-Type': 'application/json',
          Token: `${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();
      setTests(data.data);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      setTotalItems(data.totalItems);
    } catch (error) {
      console.error('Error fetching tests:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTestDetails = async (testId) => {
    setDetailsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/test/${testId}`, {
        headers: {
          'Content-Type': 'application/json',
          Token: `${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();
      setTestDetails(data);
    } catch (error) {
      console.error('Error fetching test details:', error);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleTestSelect = async (test) => {
    setSelectedTest({ ...test, testId: test._id });
    setView('details');
    await fetchTestDetails(test._id);
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedTest(null);
    setTestDetails(null);
  };
const handleViewTest = () => {
  if (testDetails && selectedTest) {
    navigate(`/test/${selectedTest.testId}`, {
      state: {
        testData: {
          ...testDetails,
          attemptStatus: selectedTest.attemptStatus // explicitly attach it
        }
      }
    });
  }
};

  useEffect(() => {
    fetchTests();
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchTests(1, searchTerm);
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  const StatusIcon = ({ status }) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in_progress':
        return <PlayCircle className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    if (diff < 7) return `${diff} days ago`;
    return date.toLocaleDateString();
  };

  const loadMore = () => {
    if (currentPage < totalPages) {
      fetchTests(currentPage + 1, searchTerm);
    }
  };

  const TestDetailsView = () => {
    if (detailsLoading) {
      return (
        <div className="p-4 text-gray-400">Loading test details...</div>
      );
    }

    if (!testDetails || !selectedTest) {
      return (
        <div className="p-4 text-center text-gray-400">Failed to load test details</div>
      );
    }

    return (
      <div className="p-4 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">{testDetails.title}</h3>
          <div className="flex items-center gap-2 mb-4">
            <StatusIcon status={selectedTest.attemptStatus} />
            <span className="text-sm px-2 py-1 rounded-full bg-gray-800 text-gray-300">
              {selectedTest.attemptStatus?.replace('_', ' ') || 'Not Started'}
            </span>
          </div>
        </div>

        <div className="space-y-3 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Created: {formatDate(selectedTest.createdAt)}</span>
          </div>

          {testDetails.seriesData && (
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span>{testDetails.seriesData.length} questions</span>
            </div>
          )}
        </div>

        {testDetails.description && (
          <div className="p-3 bg-gray-800 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Description</h4>
            <p className="text-sm text-gray-300">{testDetails.description}</p>
          </div>
        )}

        <button
          onClick={handleViewTest}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
        >
          <PlayCircle className="w-4 h-4" />
          View Test
        </button>
      </div>
    );
  };

  return (
    <div className={`bg-gray-900 text-white transition-all duration-300 ease-in-out ${isOpen ? 'w-80' : 'w-0'} overflow-hidden flex flex-col h-screen fixed left-0 top-0 z-40 shadow-2xl`}>
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {view === 'details' && (
              <button onClick={handleBackToList} className="p-1 hover:bg-gray-800 rounded">
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <h2 className="text-lg font-semibold">
              {view === 'details' ? 'Test Details' : 'Test History'}
            </h2>
          </div>
          <button onClick={toggleSidebar} className="p-1 hover:bg-gray-800 rounded">
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {view === 'list' && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg border border-gray-600 text-sm"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:bg-gray-700 rounded p-1">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {view === 'details' ? (
          <TestDetailsView />
        ) : (
          <div className="p-2">
            {loading ? (
              <div className="text-gray-400 p-4">Loading...</div>
            ) : tests.length === 0 ? (
              <div className="text-center text-gray-400 py-10">
                No test history found.
              </div>
            ) : (
              <ul className="space-y-2">
                {tests.map((test) => (
                  <li
                    key={test._id}
                    onClick={() => handleTestSelect(test)}
                    className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer"
                  >
                    <div>
                      <h3 className="text-sm font-semibold">{test.title}</h3>
                      <div className="text-xs text-gray-400">
                        Created: {formatDate(test.createdAt)}
                      </div>
                    </div>
                    <StatusIcon status={test.attemptStatus} />
                  </li>
                ))}
                {currentPage < totalPages && (
                  <button
                    onClick={loadMore}
                    className="w-full mt-4 py-2 bg-gray-800 text-gray-300 text-sm rounded hover:bg-gray-700"
                  >
                    Load More
                  </button>
                )}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestHistorySidebar;

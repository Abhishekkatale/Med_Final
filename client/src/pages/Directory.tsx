import React, { useState } from 'react';
import { Search, MapPin, Building, Stethoscope, UserPlus, Check, X, Eye, Filter, Users, Bell } from 'lucide-react';

// Mock data for Indian doctors
const doctorsData = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    title: "Cardiologist",
    specialty: "Cardiology",
    organization: "Apollo Hospital, Delhi",
    location: "New Delhi, India",
    initials: "RK",
    experience: "15 years",
    rating: 4.8,
    patients: "2000+",
    isConnected: false,
    hasPendingRequest: false,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    education: "MBBS, MD - Cardiology, AIIMS Delhi",
    consultationFee: "₹1,200"
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    title: "Pediatrician",
    specialty: "Pediatrics",
    organization: "Fortis Hospital, Mumbai",
    location: "Mumbai, Maharashtra",
    initials: "PS",
    experience: "12 years",
    rating: 4.9,
    patients: "1500+",
    isConnected: true,
    hasPendingRequest: false,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    education: "MBBS, MD - Pediatrics, KEM Hospital",
    consultationFee: "₹900"
  },
  {
    id: 3,
    name: "Dr. Arun Mehta",
    title: "Orthopedic Surgeon",
    specialty: "Orthopedics",
    organization: "Max Hospital, Bangalore",
    location: "Bangalore, Karnataka",
    initials: "AM",
    experience: "18 years",
    rating: 4.7,
    patients: "2500+",
    isConnected: false,
    hasPendingRequest: false,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
    education: "MBBS, MS - Orthopedics, NIMHANS",
    consultationFee: "₹1,500"
  },
  {
    id: 4,
    name: "Dr. Kavita Patel",
    title: "Dermatologist",
    specialty: "Dermatology",
    organization: "Manipal Hospital, Pune",
    location: "Pune, Maharashtra",
    initials: "KP",
    experience: "10 years",
    rating: 4.6,
    patients: "1200+",
    isConnected: false,
    hasPendingRequest: true,
    image: "https://media.licdn.com/dms/image/v2/D5603AQF2SJ2cBL9s9Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1685869311918?e=1755734400&v=beta&t=xemrbbTEK8wYU4BTWuIOHO70EJO4bOSyY1JV3QcWLO4",
    education: "MBBS, MD - Dermatology, Grant Medical College",
    consultationFee: "₹800"
  },
  {
    id: 5,
    name: "Dr. Suresh Reddy",
    title: "Neurologist",
    specialty: "Neurology",
    organization: "Asian Heart Institute, Hyderabad",
    location: "Hyderabad, Telangana",
    initials: "SR",
    experience: "20 years",
    rating: 4.9,
    patients: "3000+",
    isConnected: true,
    hasPendingRequest: false,
    image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face",
    education: "MBBS, DM - Neurology, NIMS",
    consultationFee: "₹1,800"
  },
  {
    id: 6,
    name: "Dr. Meera Joshi",
    title: "Gynecologist",
    specialty: "Gynecology",
    organization: "Lilavati Hospital, Mumbai",
    location: "Mumbai, Maharashtra",
    initials: "MJ",
    experience: "14 years",
    rating: 4.8,
    patients: "1800+",
    isConnected: false,
    hasPendingRequest: false,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
    education: "MBBS, MS - Gynecology, KEM Hospital",
    consultationFee: "₹1,000"
  }
];

const connectionRequests = [
  {
    id: 101,
    name: "Dr. Vikram Singh",
    title: "Psychiatrist",
    specialty: "Psychiatry",
    organization: "AIIMS, Delhi",
    location: "New Delhi, India",
    initials: "VS",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    requestDate: "2 days ago"
  },
  {
    id: 102,
    name: "Dr. Anita Gupta",
    title: "Radiologist",
    specialty: "Radiology",
    organization: "Medanta Hospital, Gurgaon",
    location: "Gurgaon, Haryana",
    initials: "AG",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    requestDate: "1 day ago"
  }
];

const specialties = ["All", "Cardiology", "Pediatrics", "Orthopedics", "Dermatology", "Neurology", "Gynecology", "Psychiatry", "Radiology"];

const MyNetworkPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [activeTab, setActiveTab] = useState("all");
  const [doctors, setDoctors] = useState(doctorsData);
  const [requests, setRequests] = useState(connectionRequests);
  const [loadingStates, setLoadingStates] = useState({});
  const [notifications, setNotifications] = useState([]);

  const showNotification = (type, message) => {
    const id = Date.now();
    const notification = { id, type, message };
    setNotifications(prev => [...prev, notification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const handleConnect = async (doctorId, doctorName) => {
    setLoadingStates(prev => ({ ...prev, [`connect-${doctorId}`]: true }));
    
    // Simulate API call
    setTimeout(() => {
      setDoctors(prev => prev.map(doc => 
        doc.id === doctorId 
          ? { ...doc, hasPendingRequest: true }
          : doc
      ));
      setLoadingStates(prev => ({ ...prev, [`connect-${doctorId}`]: false }));
      showNotification('success', `Connection request sent to ${doctorName}!`);
    }, 1000);
  };

  const handleAcceptRequest = async (requestId, doctorName) => {
    setLoadingStates(prev => ({ ...prev, [`accept-${requestId}`]: true }));
    
    setTimeout(() => {
      setRequests(prev => prev.filter(req => req.id !== requestId));
      setLoadingStates(prev => ({ ...prev, [`accept-${requestId}`]: false }));
      showNotification('success', `Connected with ${doctorName}!`);
    }, 1000);
  };

  const handleRejectRequest = async (requestId, doctorName) => {
    setLoadingStates(prev => ({ ...prev, [`reject-${requestId}`]: true }));
    
    setTimeout(() => {
      setRequests(prev => prev.filter(req => req.id !== requestId));
      setLoadingStates(prev => ({ ...prev, [`reject-${requestId}`]: false }));
      showNotification('info', `Connection request from ${doctorName} declined.`);
    }, 1000);
  };

  const handleViewProfile = (doctorId) => {
    // In a real app, this would use React Router
    window.history.pushState({}, '', `/profile/d${doctorId}`);
    showNotification('info', 'Viewing doctor profile...');
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.organization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "All" || doctor.specialty === selectedSpecialty;
    const matchesTab = activeTab === "all" || 
                      (activeTab === "connected" && doctor.isConnected) ||
                      (activeTab === "pending" && doctor.hasPendingRequest);
    
    return matchesSearch && matchesSpecialty && matchesTab;
  });

  const connectedCount = doctors.filter(d => d.isConnected).length;
  const pendingCount = doctors.filter(d => d.hasPendingRequest).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
              notification.type === 'success' ? 'bg-green-500 text-white' :
              notification.type === 'error' ? 'bg-red-500 text-white' :
              'bg-blue-500 text-white'
            }`}
          >
            <div className="flex items-center">
              {notification.type === 'success' && <Check className="w-4 h-4 mr-2" />}
              {notification.type === 'error' && <X className="w-4 h-4 mr-2" />}
              {notification.type === 'info' && <Bell className="w-4 h-4 mr-2" />}
              <span className="text-sm font-medium">{notification.message}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">My Network</h1>
              <p className="text-gray-600 text-lg">Connect with leading healthcare professionals across India</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-lg shadow-sm px-4 py-2 border">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-700">{connectedCount} Connected</span>
                </div>
              </div>
              {requests.length > 0 && (
                <div className="bg-orange-100 rounded-lg shadow-sm px-4 py-2 border border-orange-200">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-orange-600" />
                    <span className="font-semibold text-orange-700">{requests.length} New Requests</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === "all"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              All Doctors ({doctors.length})
            </button>
            <button
              onClick={() => setActiveTab("connected")}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === "connected"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Connected ({connectedCount})
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === "pending"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Pending ({pendingCount})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <Search className="w-5 h-5 mr-2 text-blue-600" />
                Search
              </h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search doctors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Specialty Filter */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2 text-blue-600" />
                Specialty
              </h3>
              <div className="space-y-2">
                {specialties.map(specialty => (
                  <label key={specialty} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="specialty"
                      value={specialty}
                      checked={selectedSpecialty === specialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">{specialty}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Connection Requests */}
            {requests.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-orange-600" />
                  Connection Requests
                </h3>
                <div className="space-y-4">
                  {requests.map(request => (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <img
                          src={request.image}
                          alt={request.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="ml-3 flex-1">
                          <h4 className="font-medium text-gray-800 text-sm">{request.name}</h4>
                          <p className="text-xs text-gray-500">{request.title}</p>
                          <p className="text-xs text-gray-400">{request.requestDate}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleAcceptRequest(request.id, request.name)}
                          disabled={loadingStates[`accept-${request.id}`]}
                          className="flex-1 bg-green-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-green-700 disabled:opacity-50"
                        >
                          {loadingStates[`accept-${request.id}`] ? 'Accepting...' : 'Accept'}
                        </button>
                        <button
                          onClick={() => handleRejectRequest(request.id, request.name)}
                          disabled={loadingStates[`reject-${request.id}`]}
                          className="flex-1 bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs font-medium hover:bg-gray-300 disabled:opacity-50"
                        >
                          {loadingStates[`reject-${request.id}`] ? 'Declining...' : 'Decline'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {filteredDoctors.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
                <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No doctors found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredDoctors.map(doctor => (
                  <div key={doctor.id} className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-14 h-14 rounded-full object-cover"
                          />
                          <div className="ml-3">
                            <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
                            <p className="text-sm text-blue-600 font-medium">{doctor.title}</p>
                            <div className="flex items-center mt-1">
                              <div className="flex items-center">
                                <span className="text-yellow-400">★</span>
                                <span className="text-sm font-medium text-gray-600 ml-1">{doctor.rating}</span>
                              </div>
                              <span className="text-gray-300 mx-2">•</span>
                              <span className="text-sm text-gray-500">{doctor.experience}</span>
                            </div>
                          </div>
                        </div>
                        {doctor.isConnected && (
                          <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                            Connected
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Building className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="truncate">{doctor.organization}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{doctor.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Stethoscope className="w-4 h-4 mr-2 text-gray-400" />
                          <span>{doctor.specialty}</span>
                        </div>
                      </div>

                      {/* Stats */}
                    
                      {/* Actions */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewProfile(doctor.id)}
                          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Profile
                        </button>
                        
                        {doctor.isConnected ? (
                          <button className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium flex items-center">
                            <Check className="w-4 h-4 mr-2" />
                            Connected
                          </button>
                        ) : doctor.hasPendingRequest ? (
                          <button className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-medium text-sm">
                            Pending
                          </button>
                        ) : (
                          <button
                            onClick={() => handleConnect(doctor.id, doctor.name)}
                            disabled={loadingStates[`connect-${doctor.id}`]}
                            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center disabled:opacity-50"
                          >
                            {loadingStates[`connect-${doctor.id}`] ? (
                              <div className="w-4 h-4 mr-2 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                            ) : (
                              <UserPlus className="w-4 h-4 mr-2" />
                            )}
                            {loadingStates[`connect-${doctor.id}`] ? 'Connecting...' : 'Connect'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNetworkPage;
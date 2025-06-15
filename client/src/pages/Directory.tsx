import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/contexts/AuthContext";

type SpecialtyFilter = "all" | string;

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

const Directory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState<SpecialtyFilter>("all");
  const [loadingStates, setLoadingStates] = useState<{[key: string]: boolean}>({});
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const queryClient = useQueryClient();
  const { token } = useAuth();

  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ["/api/users/directory", searchTerm, specialtyFilter],
  });

  const { data: specialties } = useQuery<string[]>({
    queryKey: ["/api/specialties"],
  });

  const { data: connectionRequests } = useQuery<User[]>({
    queryKey: ["/api/users/connection-requests"],
  });

  // Toast management
  const showToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    const newToast: ToastMessage = { id, type, message };
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const setLoading = (key: string, loading: boolean) => {
    setLoadingStates(prev => ({ ...prev, [key]: loading }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      showToast('info', `Searching for "${searchTerm}"`);
    }
  };

  const handleConnectRequest = async (userId: number, userName: string) => {
    const loadingKey = `connect-${userId}`;
    setLoading(loadingKey, true);
    
    try {
      await apiRequest("POST", "/api/connections/connect", { userId }, token);
      
      showToast('success', `Connection request sent to ${userName} successfully!`);
      
      queryClient.invalidateQueries({ queryKey: ["/api/users/directory"] });
      queryClient.invalidateQueries({ queryKey: ["/api/users/connection-requests"] });
      
    } catch (error) {
      showToast('error', `Failed to send connection request to ${userName}. Please try again.`);
      console.error("Error connecting with user:", error);
    } finally {
      setLoading(loadingKey, false);
    }
  };

  const handleAcceptRequest = async (userId: number, userName: string) => {
    const loadingKey = `accept-${userId}`;
    setLoading(loadingKey, true);
    
    try {
      await apiRequest("POST", "/api/connections/accept", { userId }, token);
      
      showToast('success', `Connection with ${userName} accepted successfully!`);
      
      queryClient.invalidateQueries({ queryKey: ["/api/users/connection-requests"] });
      queryClient.invalidateQueries({ queryKey: ["/api/users/directory"] });
      
    } catch (error) {
      showToast('error', `Failed to accept connection from ${userName}. Please try again.`);
      console.error("Error accepting connection:", error);
    } finally {
      setLoading(loadingKey, false);
    }
  };

  const handleIgnoreRequest = async (userId: number, userName: string) => {
    const loadingKey = `ignore-${userId}`;
    setLoading(loadingKey, true);
    
    try {
      await apiRequest("POST", "/api/connections/ignore", { userId }, token);
      
      showToast('success', `Connection request from ${userName} ignored.`);
      
      queryClient.invalidateQueries({ queryKey: ["/api/users/connection-requests"] });
      
    } catch (error) {
      showToast('error', `Failed to ignore connection request. Please try again.`);
      console.error("Error ignoring connection:", error);
    } finally {
      setLoading(loadingKey, false);
    }
  };

  const handleSpecialtyFilter = (specialty: string) => {
    setSpecialtyFilter(specialty);
    const filterText = specialty === "all" ? "all specialties" : specialty;
    showToast('info', `Filtering by ${filterText}`);
  };

  // Toast Component
  const ToastContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`max-w-sm p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-0 ${
            toast.type === 'success' 
              ? 'bg-green-500 text-white' 
              : toast.type === 'error' 
              ? 'bg-red-500 text-white' 
              : 'bg-blue-500 text-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="material-icons mr-2 text-sm">
                {toast.type === 'success' ? 'check_circle' : 
                 toast.type === 'error' ? 'error' : 'info'}
              </span>
              <span className="text-sm font-medium">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 text-white hover:text-gray-200"
            >
              <span className="material-icons text-sm">close</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <ToastContainer />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Directory</h1>
          <p className="text-gray-600">Find and connect with healthcare professionals</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-card p-4 mb-6">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="material-icons text-gray-400 text-lg">search</span>
                </span>
                <Input 
                  type="text" 
                  placeholder="Search professionals..." 
                  className="pl-10" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full mt-2 bg-primary text-white">
                Search
              </Button>
            </form>
          </div>
          
          <div className="bg-white rounded-lg shadow-card">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Filters</h2>
            </div>
            <div className="p-4">
              <Tabs defaultValue="all" value={specialtyFilter} onValueChange={(value) => setSpecialtyFilter(value as SpecialtyFilter)}>
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="connected">Connected</TabsTrigger>
                </TabsList>
                
                <div className="space-y-2 mt-4">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Specialty</h3>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="spec-all"
                      className="rounded text-primary mr-2"
                      checked={specialtyFilter === "all"}
                      onChange={() => handleSpecialtyFilter("all")}
                    />
                    <label htmlFor="spec-all" className="text-sm cursor-pointer">All Specialties</label>
                  </div>
                  
                  {specialties?.map((specialty) => (
                    <div key={specialty} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`spec-${specialty}`}
                        className="rounded text-primary mr-2"
                        checked={specialtyFilter === specialty}
                        onChange={() => handleSpecialtyFilter(specialtyFilter === specialty ? "all" : specialty)}
                      />
                      <label htmlFor={`spec-${specialty}`} className="text-sm cursor-pointer">{specialty}</label>
                    </div>
                  ))}
                </div>
              </Tabs>
            </div>
          </div>
          
          {connectionRequests && connectionRequests.length > 0 && (
            <div className="bg-white rounded-lg shadow-card mt-6">
              <div className="p-4 border-b">
                <h2 className="font-semibold">Connection Requests</h2>
              </div>
              <div className="p-4 space-y-4">
                {connectionRequests.map((request) => (
                  <div key={request.id} className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium flex-shrink-0">
                      {request.initials}
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium">{request.name}</p>
                      <p className="text-xs text-gray-500">{request.title}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm"
                        variant="outline"
                        className="text-xs bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                        onClick={() => handleAcceptRequest(request.id, request.name)}
                        disabled={loadingStates[`accept-${request.id}`]}
                      >
                        {loadingStates[`accept-${request.id}`] ? (
                          <span className="material-icons animate-spin text-xs">hourglass_empty</span>
                        ) : (
                          'Accept'
                        )}
                      </Button>
                      <Button 
                        size="sm"
                        variant="ghost"
                        className="text-xs text-gray-600 hover:bg-gray-100"
                        onClick={() => handleIgnoreRequest(request.id, request.name)}
                        disabled={loadingStates[`ignore-${request.id}`]}
                      >
                        {loadingStates[`ignore-${request.id}`] ? (
                          <span className="material-icons animate-spin text-xs">hourglass_empty</span>
                        ) : (
                          'Ignore'
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
        
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                      <div className="ml-3 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-8 bg-gray-200 rounded w-full mt-4"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : users && users.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <Card key={user.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                        {user.initials}
                      </div>
                      <div className="ml-3">
                        <CardTitle className="text-base">{user.name}</CardTitle>
                        <p className="text-xs text-gray-500">{user.title}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-2 mb-4">
                      <p className="flex items-center text-gray-600">
                        <span className="material-icons text-gray-400 text-sm mr-1">business</span>
                        {user.organization}
                      </p>
                      <p className="flex items-center text-gray-600">
                        <span className="material-icons text-gray-400 text-sm mr-1">location_on</span>
                        {user.location}
                      </p>
                    </div>
                    <Button 
                      variant={user.isConnected ? "outline" : "default"}
                      className={user.isConnected ? 
                        "w-full border-green-200 text-green-700 bg-green-50 hover:bg-green-100" : 
                        "w-full bg-primary text-white hover:bg-primary/90"
                      }
                      onClick={() => !user.isConnected && handleConnectRequest(user.id, user.name)}
                      disabled={user.isConnected || loadingStates[`connect-${user.id}`]}
                    >
                      {loadingStates[`connect-${user.id}`] ? (
                        <>
                          <span className="material-icons animate-spin text-white text-sm mr-1">hourglass_empty</span>
                          Sending...
                        </>
                      ) : user.isConnected ? (
                        <>
                          <span className="material-icons text-green-700 text-sm mr-1">check_circle</span>
                          Connected
                        </>
                      ) : (
                        <>
                          <span className="material-icons text-white text-sm mr-1">person_add</span>
                          Connect
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <span className="material-icons text-4xl text-gray-300 mb-4">people</span>
                <h3 className="text-lg font-medium text-gray-700 mb-2">No professionals found</h3>
                <p className="text-gray-500">
                  {searchTerm 
                    ? `No results found for "${searchTerm}"`
                    : "Try adjusting your filters to find more professionals"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Directory;
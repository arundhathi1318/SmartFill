
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileText, Search, Download, Eye, Calendar, Filter } from 'lucide-react';

const History = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const documents = [
    {
      id: '1',
      name: 'Tax Form 1040 - 2023',
      type: 'Government Form',
      status: 'completed',
      accuracy: '98%',
      date: '2024-01-15',
      time: '14:32',
      pages: 2,
    },
    {
      id: '2',
      name: 'Job Application - Tech Corp',
      type: 'Employment',
      status: 'completed',
      accuracy: '95%',
      date: '2024-01-14',
      time: '09:15',
      pages: 3,
    },
    {
      id: '3',
      name: 'Insurance Claim Form',
      type: 'Insurance',
      status: 'processing',
      accuracy: '92%',
      date: '2024-01-13',
      time: '16:45',
      pages: 1,
    },
    {
      id: '4',
      name: 'University Application',
      type: 'Academic',
      status: 'completed',
      accuracy: '97%',
      date: '2024-01-12',
      time: '11:20',
      pages: 4,
    },
    {
      id: '5',
      name: 'Medical History Form',
      type: 'Healthcare',
      status: 'failed',
      accuracy: '78%',
      date: '2024-01-11',
      time: '13:10',
      pages: 2,
    },
    {
      id: '6',
      name: 'Loan Application',
      type: 'Financial',
      status: 'completed',
      accuracy: '96%',
      date: '2024-01-10',
      time: '10:30',
      pages: 5,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccuracyColor = (accuracy: string) => {
    const num = parseInt(accuracy);
    if (num >= 95) return 'text-green-600';
    if (num >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    
    let matchesDate = true;
    if (dateFilter === 'today') {
      matchesDate = doc.date === '2024-01-15';
    } else if (dateFilter === 'week') {
      const docDate = new Date(doc.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      matchesDate = docDate >= weekAgo;
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Document History</h1>
          <p className="text-gray-600">
            View and manage all your processed documents
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 border-0 shadow-lg bg-white/60 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>

              {/* Date Filter */}
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[180px]">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">24</div>
              <div className="text-sm text-gray-600">Total Documents</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">20</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-2">2</div>
              <div className="text-sm text-gray-600">Processing</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">95.2%</div>
              <div className="text-sm text-gray-600">Avg Accuracy</div>
            </CardContent>
          </Card>
        </div>

        {/* Documents List */}
        <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
            <CardDescription>
              {filteredDocuments.length} documents found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex flex-col lg:flex-row lg:items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {doc.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {doc.type}
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(doc.status)}`}>
                          {doc.status}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {doc.pages} page{doc.pages !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <span>{doc.date} at {doc.time}</span>
                        <span className={`font-medium ${getAccuracyColor(doc.accuracy)}`}>
                          {doc.accuracy} accuracy
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-4 lg:mt-0">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    {doc.status === 'completed' && (
                      <Button size="sm" asChild>
                        <Link to={`/form-editor/${doc.id}`}>
                          Edit
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button asChild>
                  <Link to="/upload">Upload New Document</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default History;

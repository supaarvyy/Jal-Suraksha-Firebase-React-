import { useState, useMemo } from "react";
import { FileText, BookOpen, BarChart3, Globe, Download, ExternalLink, Calendar, TrendingUp, Award, Users, Zap, Shield, Eye, Search, Filter, Clock, X } from "lucide-react";

export default function InfoResources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const resourceCategories = [
    {
      title: "Water Quality Reports",
      titleHindi: "जल गुणवत्ता रिपोर्ट",
      description: "Comprehensive district-wise and state-wise water testing results with detailed analysis and recommendations.",
      descriptionHindi: "राज्यवार और जिला-वार जल परीक्षण की विस्तृत रिपोर्ट और सुझाव।",
      icon: <FileText className="h-6 w-6" />,
      color: "blue",
      items: [
        { name: "Annual Water Quality Report 2024", type: "PDF", size: "2.4 MB", date: "March 2024" },
        { name: "State-wise Analysis Report", type: "Excel", size: "1.8 MB", date: "February 2024" },
        { name: "District Performance Dashboard", type: "PDF", size: "3.2 MB", date: "January 2024" },
        { name: "Quality Compliance Summary", type: "PDF", size: "1.1 MB", date: "December 2023" }
      ],
      stats: { total: "156 Reports", updated: "Daily" }
    },
    {
      title: "Guidelines & Manuals",
      titleHindi: "दिशा-निर्देश एवं पुस्तिकाएँ",
      description: "Official government documents for water safety, sanitation, and conservation protocols.",
      descriptionHindi: "जल सुरक्षा, स्वच्छता एवं संरक्षण हेतु सरकारी पुस्तिकाएँ।",
      icon: <BookOpen className="h-6 w-6" />,
      color: "green",
      items: [
        { name: "Water Testing Standard Operating Procedures", type: "PDF", size: "4.7 MB", date: "January 2024" },
        { name: "ASHA Worker Training Manual", type: "PDF", size: "6.3 MB", date: "November 2023" },
        { name: "Community Participation Guidelines", type: "PDF", size: "2.9 MB", date: "October 2023" },
        { name: "Water Safety Plan Template", type: "Word", size: "0.8 MB", date: "September 2023" }
      ],
      stats: { total: "42 Documents", updated: "Monthly" }
    },
    {
      title: "Educational Materials",
      titleHindi: "शैक्षणिक सामग्री",
      description: "Interactive learning resources, awareness campaigns, and community outreach materials.",
      descriptionHindi: "स्कूलों और समुदायों हेतु पोस्टर, पर्चे और जागरूकता सामग्री।",
      icon: <Globe className="h-6 w-6" />,
      color: "orange",
      items: [
        { name: "Water Conservation Awareness Kit", type: "ZIP", size: "12.4 MB", date: "February 2024" },
        { name: "School Poster Collection", type: "PDF", size: "8.9 MB", date: "January 2024" },
        { name: "Community Workshop Slides", type: "PPT", size: "15.2 MB", date: "December 2023" },
        { name: "Interactive Water Safety Game", type: "HTML", size: "5.6 MB", date: "November 2023" }
      ],
      stats: { total: "78 Resources", updated: "Weekly" }
    },
    {
      title: "Data & Statistics",
      titleHindi: "आँकड़े एवं सांख्यिकी",
      description: "Comprehensive datasets on water usage, supply coverage, and scheme implementation progress.",
      descriptionHindi: "जल उपयोग, आपूर्ति कवरेज और योजनाओं की प्रगति से संबंधित आँकड़े।",
      icon: <BarChart3 className="h-6 w-6" />,
      color: "purple",
      items: [
        { name: "National Water Coverage Dataset", type: "CSV", size: "24.7 MB", date: "March 2024" },
        { name: "State-wise Progress Analytics", type: "Excel", size: "8.9 MB", date: "February 2024" },
        { name: "Quality Parameter Trends", type: "JSON", size: "4.2 MB", date: "February 2024" },
        { name: "Scheme Implementation Dashboard", type: "PDF", size: "7.1 MB", date: "January 2024" }
      ],
      stats: { total: "234 Datasets", updated: "Real-time" }
    }
  ];

  // All documents combined for search
  const allDocuments = useMemo(() => {
    const docs = [];
    resourceCategories.forEach(category => {
      category.items.forEach(item => {
        docs.push({
          ...item,
          category: category.title,
          categoryHindi: category.titleHindi,
          categoryColor: category.color
        });
      });
    });
    return docs;
  }, []);

  // Filter and search documents
  const filteredDocuments = useMemo(() => {
    let filtered = allDocuments;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(doc => doc.category === selectedCategory);
    }

    // Filter by type
    if (selectedType !== "All") {
      filtered = filtered.filter(doc => doc.type === selectedType);
    }

    return filtered;
  }, [allDocuments, searchTerm, selectedCategory, selectedType]);

  // Get unique document types for filter
  const documentTypes = useMemo(() => {
    const types = [...new Set(allDocuments.map(doc => doc.type))];
    return ["All", ...types];
  }, [allDocuments]);

  const categories = ["All", ...resourceCategories.map(cat => cat.title)];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: { bg: 'bg-blue-600', border: 'border-blue-500', text: 'text-blue-600', bgLight: 'bg-blue-50' },
      green: { bg: 'bg-green-600', border: 'border-green-500', text: 'text-green-600', bgLight: 'bg-green-50' },
      orange: { bg: 'bg-orange-600', border: 'border-orange-500', text: 'text-orange-600', bgLight: 'bg-orange-50' },
      purple: { bg: 'bg-purple-600', border: 'border-purple-500', text: 'text-purple-600', bgLight: 'bg-purple-50' }
    };
    return colorMap[color];
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
      {/* Government Header */}
      <section className="w-full bg-white border-b-4 border-orange-500 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* Government Emblem */}
              <div className="w-16 h-16 mr-4">
                <div className="w-full h-full bg-gradient-to-br from-orange-400 via-white to-green-500 rounded-full flex items-center justify-center border-2 border-gray-300">
                  <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Ministry of Jal Shakti</h1>
                <p className="text-sm text-gray-600">Government of India</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Last Updated</div>
              <div className="text-sm font-semibold text-gray-700">20 March 2024</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Hero Section */}
      <section className="w-full bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Information & Resources
          </h1>
          <h2 className="text-2xl font-medium text-gray-600 mb-6">
            जानकारी और संसाधन
          </h2>
          
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
            Access comprehensive official documents, research reports, and educational resources 
            for water safety and management from the Ministry of Jal Shakti.
          </p>

          {/* Key Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <div className="bg-gray-50 border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">510+</div>
              <div className="text-sm text-gray-600">Documents</div>
            </div>
            <div className="bg-gray-50 border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">2.4M</div>
              <div className="text-sm text-gray-600">Downloads</div>
            </div>
            <div className="bg-gray-50 border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">Daily</div>
              <div className="text-sm text-gray-600">Updates</div>
            </div>
            <div className="bg-gray-50 border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">12</div>
              <div className="text-sm text-gray-600">Languages</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Resource Library</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
          </div>
          
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search documents, reports, guidelines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-3 ${showFilters ? 'bg-blue-700' : 'bg-blue-600'} text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center`}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {(selectedCategory !== "All" || selectedType !== "All") && (
                <span className="ml-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {(selectedCategory !== "All" ? 1 : 0) + (selectedType !== "All" ? 1 : 0)}
                </span>
              )}
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mb-6 p-4 bg-gray-50 border rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                  >
                    {documentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Showing {filteredDocuments.length} of {allDocuments.length} documents
                </span>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedType("All");
                    setSearchTerm("");
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-gray-600 font-medium text-sm">Quick Filters:</span>
            {['Latest', 'Most Downloaded', 'Reports', 'Guidelines', 'Hindi', 'English'].map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  if (filter === 'Reports') setSelectedType('PDF');
                  else if (filter === 'Guidelines') setSelectedCategory('Guidelines & Manuals');
                }}
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full text-sm transition-colors"
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Search Results */}
          {searchTerm && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">
                Search Results for "{searchTerm}" ({filteredDocuments.length} found)
              </h3>
              {filteredDocuments.length === 0 ? (
                <p className="text-blue-600">No documents found matching your search criteria.</p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {filteredDocuments.slice(0, 10).map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white rounded border hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center flex-1">
                        <div className={`w-8 h-8 ${getColorClasses(doc.categoryColor).bgLight} rounded flex items-center justify-center mr-3`}>
                          <FileText className={`h-4 w-4 ${getColorClasses(doc.categoryColor).text}`} />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-800 text-sm">{doc.name}</div>
                          <div className="text-xs text-gray-500">
                            {doc.category} • {doc.type} • {doc.size} • {doc.date}
                          </div>
                        </div>
                      </div>
                      <button className="p-1 text-blue-600 hover:text-blue-700">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {filteredDocuments.length > 10 && (
                    <div className="text-center pt-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View all {filteredDocuments.length} results
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Resource Categories */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {resourceCategories.map((category, index) => {
            const colors = getColorClasses(category.color);
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-300"
              >
                {/* Category Header */}
                <div className={`${colors.bg} p-6 text-white rounded-t-lg`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="mr-3 p-2 bg-white bg-opacity-20 rounded">
                        {category.icon}
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <div className="opacity-90">Updated</div>
                      <div className="font-semibold">{category.stats.updated}</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <h4 className="text-lg opacity-90 mb-3">{category.titleHindi}</h4>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm bg-white bg-opacity-20 rounded px-3 py-2">
                    <span>{category.stats.total}</span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {category.stats.updated}
                    </span>
                  </div>
                </div>

                {/* Category Body */}
                <div className="p-6">
                  <p className="text-gray-700 mb-2 leading-relaxed">
                    {category.description}
                  </p>
                  <p className="text-gray-600 text-sm italic mb-6">
                    {category.descriptionHindi}
                  </p>

                  {/* Recent Documents */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-lg mb-3 text-gray-800">Recent Documents</h4>
                    <div className="space-y-3">
                      {category.items.slice(0, 3).map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded border hover:bg-gray-100 transition-colors cursor-pointer">
                          <div className="flex items-center flex-1">
                            <div className={`w-10 h-10 ${colors.bgLight} rounded flex items-center justify-center mr-3`}>
                              <FileText className={`h-4 w-4 ${colors.text}`} />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-800 text-sm">{item.name}</div>
                              <div className="text-xs text-gray-500">{item.type} • {item.size} • {item.date}</div>
                            </div>
                          </div>
                          <button className={`p-2 hover:bg-white rounded transition-colors ${colors.text}`}>
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className={`flex-1 ${colors.bg} text-white font-medium py-3 px-6 rounded hover:opacity-90 transition-opacity flex items-center justify-center`}>
                      <span>View All</span>
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </button>
                    <button className="px-4 py-3 border border-gray-300 text-gray-600 font-medium rounded hover:border-gray-400 hover:bg-gray-50 transition-all flex items-center">
                      <Download className="h-4 w-4 mr-2" />
                      Bulk
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Resources Section */}
      <section className="w-full bg-gray-50 py-12 border-t">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Resources</h2>
            <p className="text-lg text-gray-600">Most accessed and highly recommended documents</p>
            <div className="w-20 h-1 bg-orange-500 mx-auto mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "National Water Policy 2024",
                description: "Comprehensive policy framework for sustainable water management",
                type: "Policy Document",
                downloads: "45.2K",
                rating: 4.8,
                color: "blue"
              },
              {
                title: "Water Quality Testing Manual",
                description: "Complete guide for field testing and laboratory procedures",
                type: "Technical Manual",
                downloads: "32.1K",
                rating: 4.9,
                color: "green"
              },
              {
                title: "Community Engagement Toolkit",
                description: "Resources for effective community participation programs",
                type: "Toolkit",
                downloads: "28.7K",
                rating: 4.7,
                color: "purple"
              }
            ].map((resource, index) => {
              const colors = getColorClasses(resource.color);
              return (
                <div key={index} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 ${colors.bgLight} rounded flex items-center justify-center mb-4`}>
                    <Award className={`h-6 w-6 ${colors.text}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">{resource.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{resource.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2 py-1 ${colors.bgLight} ${colors.text} rounded text-xs font-medium`}>
                      {resource.type}
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <Download className="h-3 w-3 mr-1" />
                      {resource.downloads}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(resource.rating) ? 'text-yellow-400' : 'text-gray-300'}>⭐</span>
                      ))}
                      <span className="ml-2 text-xs text-gray-600">({resource.rating})</span>
                    </div>
                    <button className={`px-4 py-2 ${colors.bg} text-white rounded font-medium hover:opacity-90 transition-opacity`}>
                      Download
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Help & Support Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Need Help Finding Resources?</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Our support team is available to help you locate specific documents, provide guidance on resource usage, 
            or assist with technical questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center bg-blue-600 text-white font-medium px-6 py-3 rounded hover:bg-blue-700 transition-colors">
              <Shield className="h-4 w-4 mr-2" />
              Contact Support
            </button>
            <button className="inline-flex items-center justify-center bg-green-600 text-white font-medium px-6 py-3 rounded hover:bg-green-700 transition-colors">
              <Eye className="h-4 w-4 mr-2" />
              User Guide
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-white border-t py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-2 bg-orange-500 rounded-full mr-2"></div>
            <div className="w-8 h-2 bg-white border-2 border-gray-300 rounded-full mr-2"></div>
            <div className="w-8 h-2 bg-green-600 rounded-full"></div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">ज्ञान ही शक्ति है • Knowledge is Power</h2>
            <p className="text-lg text-gray-600">
              Empowering communities through accessible information and resources
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
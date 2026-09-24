export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-12 py-8 text-center text-sm text-gray-600">
      <div className="max-w-6xl mx-auto px-6 space-y-2">
        <p>
          Website Content Managed by <span className="font-semibold">Ministry of Jal Shakti, Government of India</span>
        </p>
        <p>
          <a href="#" className="hover:underline mx-1">Sitemap</a> | 
          <a href="#" className="hover:underline mx-1">Website Policies</a> | 
          <a href="#" className="hover:underline mx-1">Help</a> | 
          <a href="#" className="hover:underline mx-1">Disclaimer</a>
        </p>
        <p>
          Last Updated: 19 Sep 2025 | Visitor Count: 1,23,45,678
        </p>
        <p>
          © 2025 <span className="font-semibold">National Informatics Centre (NIC)</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

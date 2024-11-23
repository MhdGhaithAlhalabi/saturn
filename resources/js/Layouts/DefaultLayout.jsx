import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';


import Sidebar from '../Components/Sidebar/index';
import Header from '../Components/Header';
import '../../css/satoshi.css';
import '../../css/style.css';
import SearchResults from '@/Components/Search/SearchResults';

const DefaultLayout = ({ children }) => {
    const { props } = usePage();
    const { url } = usePage();
    const { auth } = props;
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false); // حالة عرض نتائج البحث



    // التحقق من تسجيل الدخول
    // if (!auth.user) {
    //     // إذا لم يكن مسجل الدخول، إعادة توجيه إلى صفحة تسجيل الدخول
    //     window.location.href = '/login';
    //     return null; // منع أي محتوى من الظهور
    // }
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    setShowSearchResults(false); // إخفاء نتائج البحث عند تغيير الصفحة
  }, [url]); // يتم تشغيل هذا الكود عند تغيير URL الصفحة

  return (
    <div className="dark:bg-boxdark-2">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header 
           onSearchResults={(results) =>
             {
              setSearchResults(results); // تحديث نتائج البحث
              setShowSearchResults(true); // عرض نتائج البحث
            }
        }
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
             
            {showSearchResults && <SearchResults results={searchResults} />}
       
                  {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;

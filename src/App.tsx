import { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  Plane,
  CheckCircle,
  ArrowLeft,
  CreditCard,
  Star,
  Wifi,
  Coffee,
  Tv,
  Shield,
} from "lucide-react";

// Types
interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: { city: string; code: string; time: string };
  arrival: { city: string; code: string; time: string };
  duration: string;
  price: number;
  seats: number;
  aircraft: string;
  amenities: string[];
}

interface PassengerInfo {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// Mock flight data
const mockFlights: Flight[] = [
  {
    id: "1",
    airline: "Qazaq Air",
    flightNumber: "IQ 101",
    departure: { city: "Алматы", code: "ALA", time: "08:30" },
    arrival: { city: "Астана", code: "NUR", time: "10:15" },
    duration: "1h 45m",
    price: 45000,
    seats: 23,
    aircraft: "Boeing 737-800",
    amenities: ["wifi", "food", "entertainment"],
  },
  {
    id: "2",
    airline: "Qazaq Air",
    flightNumber: "IQ 203",
    departure: { city: "Алматы", code: "ALA", time: "14:20" },
    arrival: { city: "Астана", code: "NUR", time: "16:05" },
    duration: "1h 45m",
    price: 52000,
    seats: 8,
    aircraft: "Airbus A320",
    amenities: ["wifi", "food", "entertainment", "priority"],
  },
  {
    id: "3",
    airline: "Qazaq Air",
    flightNumber: "IQ 305",
    departure: { city: "Алматы", code: "ALA", time: "19:45" },
    arrival: { city: "Астана", code: "NUR", time: "21:30" },
    duration: "1h 45m",
    price: 48000,
    seats: 15,
    aircraft: "Boeing 737-800",
    amenities: ["wifi", "food"],
  },
];

const cities = [
  "Алматы",
  "Астана",
  "Шымкент",
  "Актобе",
  "Тараз",
  "Павлодар",
  "Усть-Каменогорск",
  "Семей",
];

// Mock passenger data for form prefilling
const mockPassengerData = [
  {
    firstName: "Алтай",
    lastName: "Назарбаев",
    email: "altay.nazarbayev@gmail.com",
    phone: "+7 (777) 123-45-67",
  },
  {
    firstName: "Айгүл",
    lastName: "Қасымова",
    email: "",
    phone: "",
  },
  {
    firstName: "Нұрлан",
    lastName: "Сәтбаев",
    email: "",
    phone: "",
  },
  {
    firstName: "Гүлнар",
    lastName: "Өтебаева",
    email: "",
    phone: "",
  },
  {
    firstName: "Ерлан",
    lastName: "Досмұхамедов",
    email: "",
    phone: "",
  },
  {
    firstName: "Мақпал",
    lastName: "Жұмабекова",
    email: "",
    phone: "",
  },
  {
    firstName: "Арман",
    lastName: "Қошербаев",
    email: "",
    phone: "",
  },
  {
    firstName: "Камила",
    lastName: "Әділбекова",
    email: "",
    phone: "",
  },
  {
    firstName: "Бекзат",
    lastName: "Тұрсынов",
    email: "",
    phone: "",
  },
];

// Payment form components (from the provided code)
const VisaIcon = () => (
  <svg className="w-8 h-5" viewBox="0 0 48 32" fill="none">
    <rect width="48" height="32" rx="4" fill="#1A1F71" />
    <path d="M20.5 21H17.5L19.5 11H22.5L20.5 21Z" fill="white" />
    <path
      d="M31 11L28.5 17.5L28 15.5L26.5 11H23.5L26.5 21H29.5L34 11H31Z"
      fill="white"
    />
    <path
      d="M13.5 11L10 21H13L13.5 19H16.5L17 21H20L16.5 11H13.5Z"
      fill="white"
    />
  </svg>
);

const MastercardIcon = () => (
  <svg className="w-8 h-5" viewBox="0 0 48 32" fill="none">
    <rect width="48" height="32" rx="4" fill="#EB001B" />
    <circle cx="19" cy="16" r="9" fill="#FF5F00" />
    <circle cx="29" cy="16" r="9" fill="#F79E1B" />
    <path
      d="M24 10C25.5 11.5 26.5 13.5 26.5 16C26.5 18.5 25.5 20.5 24 22C22.5 20.5 21.5 18.5 21.5 16C21.5 13.5 22.5 11.5 24 10Z"
      fill="#EB001B"
    />
  </svg>
);

const KaspiLogo = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#FF4B3A" />
    <path
      d="M8 8V16H10V12.5L12 14.5L14 12.5V16H16V8H14L12 10L10 8H8Z"
      fill="white"
    />
    <circle cx="6" cy="12" r="1.5" fill="white" />
    <circle cx="18" cy="12" r="1.5" fill="white" />
  </svg>
);

const HalykLogo = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#00A859" />
    <path d="M12 6L7 12H10V18H14V12H17L12 6Z" fill="white" />
    <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="1" fill="none" />
  </svg>
);

const ApplePayLogo = () => (
  <svg className="w-8 h-4" viewBox="0 0 48 24" fill="none">
    <rect width="48" height="24" rx="4" fill="#000000" />
    <path
      d="M8.5 7.5c-.5-.8-1.3-1.3-2.2-1.3-.1 1-.3 1.9-.9 2.6-.6.8-1.5 1.3-2.4 1.2-.1-.9.3-1.8.8-2.4.6-.7 1.5-1.2 2.4-1.2.1 0 .2 0 .3.1z"
      fill="white"
    />
    <path
      d="M8.4 9.8c-1.3-.1-2.4.7-3 .7-.7 0-1.7-.7-2.8-.7-1.4 0-2.7.8-3.4 2.1-1.5 2.6-.4 6.4 1 8.5.7 1 1.5 2.2 2.6 2.1 1-.1 1.4-.7 2.6-.7 1.2 0 1.5.7 2.6.7 1.1 0 1.8-1 2.5-2 .8-1.2 1.1-2.3 1.1-2.4 0 0-2.1-.8-2.1-3.2 0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-.6z"
      fill="white"
    />
    <text x="16" y="16" fill="white" fontSize="8" fontFamily="Arial">
      Pay
    </text>
  </svg>
);

const GooglePayLogo = () => (
  <svg className="w-8 h-4" viewBox="0 0 48 24" fill="none">
    <rect width="48" height="24" rx="4" fill="#5F6368" />
    <path
      d="M20.16 12c0-.72-.06-1.42-.18-2.1H12v3.96h4.58c-.2 1.08-.8 2-1.7 2.62v2.16h2.76c1.6-1.48 2.52-3.66 2.52-6.24z"
      fill="white"
    />
    <path
      d="M12 20c2.3 0 4.22-.76 5.62-2.06L15.86 16.3c-.78.52-1.78.82-2.86.82-2.2 0-4.06-1.48-4.72-3.48H5.5v2.22C6.88 17.68 9.26 20 12 20z"
      fill="white"
    />
    <path
      d="M7.28 13.64c-.18-.52-.28-1.08-.28-1.64s.1-1.12.28-1.64V7.14H5.5C4.54 9.06 4.54 11.34 5.5 13.22l1.78-1.58z"
      fill="white"
    />
    <path
      d="M12 8c1.24 0 2.36.42 3.24 1.26l2.42-2.42C16.22 5.54 14.3 4.78 12 4.78c-2.74 0-5.12 1.32-6.5 3.36l1.78 1.58C7.94 8.48 9.8 8 12 8z"
      fill="white"
    />
    <text x="22" y="16" fill="white" fontSize="6" fontFamily="Arial">
      GPay
    </text>
  </svg>
);

// Main App Component
const QazaqAirApp = () => {
  const [currentStep, setCurrentStep] = useState("search");
  const [searchData, setSearchData] = useState({
    from: "Алматы",
    to: "Астана",
    departure: (() => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split("T")[0];
    })(),
    return: "",
    passengers: 1,
    tripType: "oneWay",
  });
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [passengerData, setPassengerData] = useState<PassengerInfo[]>([]);

  // Search Component
  const SearchComponent = () => {
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
      setTimeout(() => setIsAnimated(true), 100);
    }, []);

    const handleSearch = () => {
      if (searchData.from && searchData.to && searchData.departure) {
        setCurrentStep("flights");
      }
    };

    const swapCities = () => {
      setSearchData((prev) => ({
        ...prev,
        from: prev.to,
        to: prev.from,
      }));
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
        {/* Header */}
        <header className="relative z-10 px-4 sm:px-6 py-3 sm:py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div
              className="flex items-center space-x-3"
              style={{
                opacity: isAnimated ? 1 : 0,
                transform: `translateY(${isAnimated ? 0 : -20}px)`,
                transition: "all 0.6s ease-out",
              }}
            >
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Plane className="w-6 h-6 text-white transform rotate-45" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Qazaq Air
                </h1>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Летайте с комфортом
                </p>
              </div>
            </div>
            <nav
              className="hidden md:flex space-x-8 text-gray-800"
              style={{
                opacity: isAnimated ? 1 : 0,
                transform: `translateY(${isAnimated ? 0 : -20}px)`,
                transition: "all 0.6s ease-out 0.2s",
              }}
            >
              <a href="#" className="hover:text-blue-600 transition-colors">
                Рейсы
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                Чек-ин
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                О нас
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                Контакты
              </a>
            </nav>
            {/* Mobile menu button */}
            <button className="md:hidden text-gray-800 p-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="relative z-10 px-4 sm:px-6 py-6 sm:py-12 pb-24 sm:pb-12">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div
              className="text-center mb-8 sm:mb-12"
              style={{
                opacity: isAnimated ? 1 : 0,
                transform: `translateY(${isAnimated ? 0 : 30}px)`,
                transition: "all 0.8s ease-out 0.3s",
              }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
                Откройте мир с <span className="text-blue-600">Qazaq Air</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 px-2 sm:px-4 leading-relaxed">
                Комфортные перелеты по Казахстану и за его пределами
              </p>
            </div>

            {/* Search Form */}
            <div
              className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8"
              style={{
                opacity: isAnimated ? 1 : 0,
                transform: `translateY(${isAnimated ? 0 : 40}px)`,
                transition: "all 0.8s ease-out 0.5s",
              }}
            >
              {/* Trip Type Toggle */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
                <button
                  onClick={() =>
                    setSearchData((prev) => ({ ...prev, tripType: "oneWay" }))
                  }
                  className={`px-6 py-3 sm:px-4 sm:py-2 rounded-xl font-medium transition-all touch-manipulation ${
                    searchData.tripType === "oneWay"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300"
                  }`}
                >
                  В одну сторону
                </button>
                <button
                  onClick={() =>
                    setSearchData((prev) => ({
                      ...prev,
                      tripType: "roundTrip",
                    }))
                  }
                  className={`px-6 py-3 sm:px-4 sm:py-2 rounded-xl font-medium transition-all touch-manipulation ${
                    searchData.tripType === "roundTrip"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300"
                  }`}
                >
                  Туда и обратно
                </button>
              </div>

              {/* Search Fields */}
              <div className="flex flex-col lg:flex-row lg:flex-wrap lg:items-end gap-3 sm:gap-4 mb-6">
                {/* From */}
                <div className="flex-1 w-full lg:min-w-[150px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Откуда
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <select
                      value={searchData.from}
                      onChange={(e) =>
                        setSearchData((prev) => ({
                          ...prev,
                          from: e.target.value,
                        }))
                      }
                      className="w-full pl-10 pr-4 py-3 h-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base touch-manipulation"
                    >
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex items-center justify-center lg:pb-3 -my-1 sm:my-0">
                  <button
                    onClick={swapCities}
                    className="p-3 sm:p-2 rounded-full bg-blue-50 hover:bg-blue-100 active:bg-blue-200 transition-colors group touch-manipulation"
                  >
                    <ArrowRight className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform lg:rotate-0 rotate-90" />
                  </button>
                </div>

                {/* To */}
                <div className="flex-1 w-full lg:min-w-[150px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Куда
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <select
                      value={searchData.to}
                      onChange={(e) =>
                        setSearchData((prev) => ({
                          ...prev,
                          to: e.target.value,
                        }))
                      }
                      className="w-full pl-10 pr-4 py-3 h-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base touch-manipulation"
                    >
                      {cities
                        .filter((city) => city !== searchData.from)
                        .map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                {/* Departure Date */}
                <div className="flex-1 w-full lg:min-w-[150px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Дата вылета
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={searchData.departure}
                      onChange={(e) =>
                        setSearchData((prev) => ({
                          ...prev,
                          departure: e.target.value,
                        }))
                      }
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full pl-10 pr-4 py-3 h-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base touch-manipulation"
                    />
                  </div>
                </div>

                {/* Return Date - only show for round trip */}
                {searchData.tripType === "roundTrip" && (
                  <div className="flex-1 w-full lg:min-w-[150px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Дата возвращения
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={searchData.return}
                        onChange={(e) =>
                          setSearchData((prev) => ({
                            ...prev,
                            return: e.target.value,
                          }))
                        }
                        min={
                          searchData.departure ||
                          new Date().toISOString().split("T")[0]
                        }
                        className="w-full pl-10 pr-4 py-3 h-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base touch-manipulation"
                      />
                    </div>
                  </div>
                )}

                {/* Passengers */}
                <div className="w-full sm:flex-1 lg:min-w-[120px] lg:max-w-[180px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Пассажиры
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <select
                      value={searchData.passengers}
                      onChange={(e) =>
                        setSearchData((prev) => ({
                          ...prev,
                          passengers: parseInt(e.target.value),
                        }))
                      }
                      className="w-full pl-10 pr-4 py-3 h-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base touch-manipulation appearance-none bg-white"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "пассажир" : "пассажира"}
                        </option>
                      ))}
                    </select>
                    {/* Custom dropdown arrow for better mobile visibility */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Search Button - Hidden on mobile, visible on larger screens */}
                <div className="w-full lg:flex-shrink-0 hidden sm:block">
                  <button
                    onClick={handleSearch}
                    disabled={
                      !searchData.from ||
                      !searchData.to ||
                      !searchData.departure
                    }
                    className="w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] mt-4 lg:mt-8 touch-manipulation shadow-lg"
                  >
                    🔍 Найти рейсы
                  </button>
                </div>
              </div>

              {/* Mobile Sticky Search Button */}
            </div>
            <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-50 shadow-lg">
              <button
                onClick={handleSearch}
                disabled={
                  !searchData.from || !searchData.to || !searchData.departure
                }
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 touch-manipulation shadow-lg flex items-center justify-center space-x-2 active:scale-[0.98]"
              >
                <span>🔍</span>
                <span>Найти рейсы</span>
              </button>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-5 rounded-full"></div>
          <div className="absolute top-60 -left-20 w-60 h-60 bg-white opacity-5 rounded-full"></div>
          <div className="absolute bottom-40 right-60 w-40 h-40 bg-white opacity-5 rounded-full"></div>
        </div>
      </div>
    );
  };

  // Flights List Component
  const FlightsListComponent = () => {
    const [animatedFlights, setAnimatedFlights] = useState<
      Record<number, boolean>
    >({});

    useEffect(() => {
      mockFlights.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedFlights((prev) => ({ ...prev, [index]: true }));
        }, index * 150);
      });
    }, []);

    const selectFlight = (flight: Flight) => {
      setSelectedFlight(flight);
      // Initialize passenger data with mock data
      const passengers: PassengerInfo[] = Array.from(
        { length: searchData.passengers },
        (_, i) => {
          const mockData = mockPassengerData[i] || mockPassengerData[0]; // Fallback to first passenger if not enough mock data
          return {
            id: i + 1,
            firstName: mockData.firstName,
            lastName: mockData.lastName,
            email: i === 0 ? mockData.email : "", // Only first passenger gets email
            phone: i === 0 ? mockData.phone : "", // Only first passenger gets phone
          };
        }
      );
      setPassengerData(passengers);
      setCurrentStep("passenger-info");
    };

    const AmenityIcon = ({ type }: { type: string }) => {
      switch (type) {
        case "wifi":
          return <Wifi className="w-4 h-4" />;
        case "food":
          return <Coffee className="w-4 h-4" />;
        case "entertainment":
          return <Tv className="w-4 h-4" />;
        case "priority":
          return <Star className="w-4 h-4" />;
        default:
          return null;
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-md">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <button
                onClick={() => setCurrentStep("search")}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors self-start"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm sm:text-base">Назад к поиску</span>
              </button>
              <div className="text-center sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2">
                <h1 className="text-lg sm:text-xl font-bold text-gray-800">
                  {searchData.from} → {searchData.to}
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">
                  {new Date(searchData.departure).toLocaleDateString("ru-RU", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  • {searchData.passengers} пассажир
                  {searchData.passengers > 1 ? "а" : ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Flight Results */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 mb-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Доступные рейсы
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Найдено {mockFlights.length} рейсов
                </p>
              </div>

              {/* Mobile Sort Options */}
              <div className="flex space-x-2 sm:hidden">
                <button className="flex items-center space-x-1 px-3 py-2 bg-gray-100 rounded-lg text-sm">
                  <span>Цена</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                    />
                  </svg>
                </button>
                <button className="flex items-center space-x-1 px-3 py-2 bg-gray-100 rounded-lg text-sm">
                  <span>Время</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6l4 2"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {mockFlights.map((flight, index) => (
              <div
                key={flight.id}
                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 active:scale-[0.98] sm:active:scale-100 cursor-pointer sm:cursor-default"
                style={{
                  opacity: animatedFlights[index] ? 1 : 0,
                  transform: `translateY(${animatedFlights[index] ? 0 : 30}px)`,
                  transition: `all 0.5s ease-out ${index * 0.1}s`,
                }}
                onClick={(e) => {
                  if (
                    window.innerWidth < 640 &&
                    !(e.target as Element).closest("button")
                  ) {
                    if (navigator.vibrate) {
                      navigator.vibrate(30);
                    }
                    selectFlight(flight);
                  }
                }}
              >
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    {/* Flight Info */}
                    <div className="flex-1">
                      {/* Mobile-first layout - airline info and price in header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center">
                            <Plane className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-sm sm:text-base font-semibold text-gray-800">
                              {flight.airline}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600">
                              {flight.flightNumber} • {flight.aircraft}
                            </p>
                          </div>
                        </div>
                        {/* Mobile price display */}
                        <div className="text-right sm:hidden">
                          <div className="text-xl font-bold text-blue-600">
                            ₸{flight.price.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {flight.seats} мест
                          </div>
                        </div>
                      </div>

                      {/* Flight times - optimized mobile layout */}
                      <div className="bg-gray-50 rounded-lg p-3 mb-3">
                        <div className="flex items-center justify-between">
                          {/* Departure */}
                          <div className="text-left flex-1">
                            <div className="text-lg sm:text-2xl font-bold text-gray-800">
                              {flight.departure.time}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600">
                              {flight.departure.code}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500 truncate">
                              {flight.departure.city}
                            </div>
                          </div>

                          {/* Duration - mobile optimized */}
                          <div className="flex-1 px-4">
                            <div className="flex items-center justify-center">
                              <div className="w-full h-0.5 bg-gray-300 relative">
                                <div className="absolute right-0 w-2 h-2 bg-blue-500 rounded-full transform translate-x-1"></div>
                              </div>
                            </div>
                            <div className="text-center mt-1">
                              <div className="text-xs sm:text-sm text-gray-600 font-medium">
                                {flight.duration}
                              </div>
                              <div className="text-xs text-gray-500">
                                Прямой
                              </div>
                            </div>
                          </div>

                          {/* Arrival */}
                          <div className="text-right flex-1">
                            <div className="text-lg sm:text-2xl font-bold text-gray-800">
                              {flight.arrival.time}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600">
                              {flight.arrival.code}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500 truncate">
                              {flight.arrival.city}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Amenities - mobile optimized */}
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        {flight.amenities.map((amenity, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-1 text-gray-500 bg-gray-100 px-2 py-1 rounded-full"
                          >
                            <AmenityIcon type={amenity} />
                            <span className="text-xs capitalize">
                              {amenity === "wifi"
                                ? "Wi-Fi"
                                : amenity === "food"
                                ? "Питание"
                                : amenity === "entertainment"
                                ? "Развлечения"
                                : amenity === "priority"
                                ? "Приоритет"
                                : amenity}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Mobile book button - enhanced */}
                      <div className="sm:hidden">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Haptic feedback simulation
                            if (navigator.vibrate) {
                              navigator.vibrate(50);
                            }
                            selectFlight(flight);
                          }}
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center space-x-2 touch-manipulation"
                        >
                          <span>Выбрать рейс</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Price & Book - Desktop */}
                    <div className="hidden sm:block text-center ml-6">
                      <div className="text-3xl font-bold text-gray-800 mb-1">
                        ₸{flight.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        за пассажира
                      </div>
                      <div className="text-xs text-gray-500 mb-4">
                        Осталось мест: {flight.seats}
                      </div>
                      <button
                        onClick={() => selectFlight(flight)}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                      >
                        Выбрать
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Passenger Info Component
  const PassengerInfoComponent = () => {
    const isValid = passengerData.every(
      (passenger) =>
        passenger.firstName &&
        passenger.lastName &&
        (passenger.id === 1 ? passenger.email && passenger.phone : true)
    );

    const updatePassenger = (
      id: number,
      field: keyof PassengerInfo,
      value: string
    ) => {
      setPassengerData((prev) =>
        prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
      );
    };

    const proceedToPayment = () => {
      if (isValid) {
        setCurrentStep("payment");
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-md">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <button
                onClick={() => setCurrentStep("flights")}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors self-start"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm sm:text-base">Назад к рейсам</span>
              </button>
              <h1 className="text-lg sm:text-xl font-bold text-gray-800 sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2">
                Информация о пассажирах
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Flight Summary - Mobile Optimized */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
              Выбранный рейс
            </h3>

            {/* Mobile-first layout */}
            <div className="space-y-4">
              {/* Flight route and times */}
              <div className="flex items-center justify-between">
                <div className="text-left flex-1">
                  <div className="text-lg sm:text-xl font-bold text-gray-800">
                    {selectedFlight?.departure.time}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {selectedFlight?.departure.city}
                  </div>
                </div>
                <div className="flex-1 px-4">
                  <div className="flex items-center justify-center">
                    <div className="w-full h-0.5 bg-gray-300 relative">
                      <div className="absolute right-0 w-2 h-2 bg-blue-500 rounded-full transform translate-x-1"></div>
                    </div>
                  </div>
                  <div className="text-center mt-1">
                    <div className="text-xs text-gray-500">
                      {selectedFlight?.duration}
                    </div>
                  </div>
                </div>
                <div className="text-right flex-1">
                  <div className="text-lg sm:text-xl font-bold text-gray-800">
                    {selectedFlight?.arrival.time}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {selectedFlight?.arrival.city}
                  </div>
                </div>
              </div>

              {/* Flight details and price */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    {selectedFlight?.flightNumber}
                  </div>
                  <div className="text-xs text-gray-500">
                    {searchData.passengers} пассажир
                    {searchData.passengers > 1 ? "а" : ""}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600">
                    ₸
                    {(
                      (selectedFlight?.price || 0) * searchData.passengers
                    ).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">Итого</div>
                </div>
              </div>
            </div>
          </div>

          {/* Passenger Forms - Mobile Optimized */}
          <div className="space-y-4 sm:space-y-6">
            {passengerData.map((passenger) => (
              <div
                key={passenger.id}
                className="bg-white rounded-xl shadow-md p-4 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-800">
                    Пассажир {passenger.id}
                  </h4>
                  {passenger.id === 1 && (
                    <span className="text-xs sm:text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full mt-1 sm:mt-0 self-start sm:self-center">
                      Основной контакт
                    </span>
                  )}
                </div>

                <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Имя *
                    </label>
                    <input
                      type="text"
                      value={passenger.firstName}
                      onChange={(e) =>
                        updatePassenger(
                          passenger.id,
                          "firstName",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                      placeholder="Введите имя"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Фамилия *
                    </label>
                    <input
                      type="text"
                      value={passenger.lastName}
                      onChange={(e) =>
                        updatePassenger(
                          passenger.id,
                          "lastName",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                      placeholder="Введите фамилию"
                    />
                  </div>

                  {passenger.id === 1 && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={passenger.email}
                          onChange={(e) =>
                            updatePassenger(
                              passenger.id,
                              "email",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                          placeholder="example@mail.com"
                          autoComplete="email"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Телефон *
                        </label>
                        <input
                          type="tel"
                          value={passenger.phone}
                          onChange={(e) =>
                            updatePassenger(
                              passenger.id,
                              "phone",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                          placeholder="+7 (777) 123-45-67"
                          autoComplete="tel"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Continue Button - Mobile Optimized */}
          <div className="mt-6 sm:mt-8 sticky bottom-0 sm:static bg-gray-50 sm:bg-transparent pt-4 sm:pt-0 -mx-4 sm:mx-0 px-4 sm:px-0 pb-4 sm:pb-0">
            <button
              onClick={() => {
                if (navigator.vibrate) {
                  navigator.vibrate(50);
                }
                proceedToPayment();
              }}
              disabled={!isValid}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold text-base sm:text-lg hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] touch-manipulation shadow-lg"
            >
              Перейти к оплате
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Payment Component
  const PaymentComponent = () => {
    const [selectedSavedCard, setSelectedSavedCard] = useState<string | null>(
      null
    );
    const [showNewCardForm, setShowNewCardForm] = useState(false);
    const [cardData, setCardData] = useState({
      number: "",
      expiry: "",
      cvv: "",
      name: "",
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Mock saved cards data
    const savedCards = [
      {
        id: "1",
        last4: "4242",
        brand: "Visa",
        expiryMonth: "12",
        expiryYear: "26",
        holderName: "JOHN SMITH",
      },
      {
        id: "2",
        last4: "5555",
        brand: "Mastercard",
        expiryMonth: "09",
        expiryYear: "25",
        holderName: "JOHN SMITH",
      },
    ];

    const handleCardInput = (field: string, value: string) => {
      if (field === "number") {
        value = value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
      } else if (field === "expiry") {
        value = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2");
      } else if (field === "cvv") {
        value = value.replace(/\D/g, "");
      }
      setCardData((prev) => ({ ...prev, [field]: value }));
    };

    const processPayment = async () => {
      setIsProcessing(true);
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        setShowSuccess(true);
      }, 3000);
    };

    const totalPrice = (selectedFlight?.price || 0) * searchData.passengers;

    if (showSuccess) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Оплата прошла успешно!
            </h2>
            <p className="text-gray-600 mb-6">
              Ваш билет на рейс {selectedFlight?.flightNumber} забронирован.
              Информация отправлена на указанный email.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Рейс:</strong> {selectedFlight?.flightNumber}
                </p>
                <p>
                  <strong>Маршрут:</strong> {searchData.from} → {searchData.to}
                </p>
                <p>
                  <strong>Дата:</strong>{" "}
                  {new Date(searchData.departure).toLocaleDateString("ru-RU")}
                </p>
                <p>
                  <strong>Время:</strong> {selectedFlight?.departure.time} -{" "}
                  {selectedFlight?.arrival.time}
                </p>
                <p>
                  <strong>Пассажиры:</strong> {searchData.passengers}
                </p>
                <p>
                  <strong>Итого:</strong> ₸{totalPrice.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setCurrentStep("search");
                  setShowSuccess(false);
                  setSelectedFlight(null);
                  setPassengerData([]);
                  setSearchData((prev) => ({
                    ...prev,
                    departure: "",
                    return: "",
                  }));
                }}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Забронировать еще билет
              </button>
              <button
                onClick={() => {
                  setShowSuccess(false);
                  setCurrentStep("payment");
                }}
                className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Назад к оплате</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-md">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentStep("passenger-info")}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Назад</span>
              </button>
              <h1 className="text-xl font-bold text-gray-800">Оплата</h1>
              <div className="w-24"></div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Express Checkout Options */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Быстрая оплата
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <button
                    onClick={() => processPayment()}
                    className="w-full bg-black text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center space-x-3"
                  >
                    <ApplePayLogo />
                  </button>
                  <button
                    onClick={() => processPayment()}
                    className="w-full bg-gray-700 text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-600 transition-colors flex items-center justify-center space-x-3"
                  >
                    <GooglePayLogo />
                  </button>
                  <button
                    onClick={() => processPayment()}
                    className="w-full bg-blue-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <KaspiLogo />
                    <span className="text-sm">Kaspi</span>
                  </button>
                  <button
                    onClick={() => processPayment()}
                    className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <HalykLogo />
                    <span className="text-sm">Halyk</span>
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 text-gray-500">
                    или выберите другой способ
                  </span>
                </div>
              </div>

              {/* Card Selection */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Оплата картой
                  </h3>
                  <div className="flex space-x-2">
                    <VisaIcon />
                    <MastercardIcon />
                  </div>
                </div>

                {/* Saved Cards */}
                <div className="space-y-3 mb-6">
                  {savedCards.map((card) => (
                    <div
                      key={card.id}
                      onClick={() => {
                        setSelectedSavedCard(card.id);
                        setShowNewCardForm(false);
                      }}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        selectedSavedCard === card.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                            {card.brand === "Visa" ? (
                              <VisaIcon />
                            ) : (
                              <MastercardIcon />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">
                              •••• •••• •••• {card.last4}
                            </div>
                            <div className="text-sm text-gray-600">
                              {card.holderName}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {card.expiryMonth}/{card.expiryYear}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add New Card Button */}
                  <div
                    onClick={() => {
                      setShowNewCardForm(true);
                      setSelectedSavedCard(null);
                    }}
                    className={`p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                      showNewCardForm
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2 text-gray-600">
                      <CreditCard className="w-5 h-5" />
                      <span className="font-medium">Добавить новую карту</span>
                    </div>
                  </div>
                </div>

                {/* New Card Form - only show when "Add new card" is selected */}
                {showNewCardForm && (
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="text-md font-semibold text-gray-800 mb-4">
                      Данные новой карты
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Номер карты
                        </label>
                        <input
                          type="text"
                          value={cardData.number}
                          onChange={(e) =>
                            handleCardInput("number", e.target.value)
                          }
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Срок действия
                          </label>
                          <input
                            type="text"
                            value={cardData.expiry}
                            onChange={(e) =>
                              handleCardInput("expiry", e.target.value)
                            }
                            placeholder="MM/YY"
                            maxLength={5}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            value={cardData.cvv}
                            onChange={(e) =>
                              handleCardInput("cvv", e.target.value)
                            }
                            placeholder="123"
                            maxLength={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Имя владельца
                        </label>
                        <input
                          type="text"
                          value={cardData.name}
                          onChange={(e) =>
                            handleCardInput("name", e.target.value)
                          }
                          placeholder="IVAN PETROV"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Security Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-blue-600 mr-3" />
                  <p className="text-sm text-blue-800">
                    Ваши данные защищены с помощью SSL-шифрования. Мы не
                    сохраняем данные вашей карты.
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Детали заказа
                </h3>

                {/* Flight Info */}
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Рейс</span>
                    <span className="font-medium">
                      {selectedFlight?.flightNumber}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Маршрут</span>
                    <span className="font-medium">
                      {searchData.from} → {searchData.to}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Дата</span>
                    <span className="font-medium">
                      {new Date(searchData.departure).toLocaleDateString(
                        "ru-RU"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Время</span>
                    <span className="font-medium">
                      {selectedFlight?.departure.time} -{" "}
                      {selectedFlight?.arrival.time}
                    </span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Билет × {searchData.passengers}
                    </span>
                    <span className="font-medium">
                      ₸{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Сборы и налоги
                    </span>
                    <span className="font-medium">₸0</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-800">
                      Итого
                    </span>
                    <span className="text-xl font-bold text-gray-800">
                      ₸{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  onClick={processPayment}
                  disabled={
                    isProcessing ||
                    (!selectedSavedCard &&
                      (!showNewCardForm ||
                        !cardData.number ||
                        !cardData.expiry ||
                        !cardData.cvv ||
                        !cardData.name))
                  }
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Обработка...
                    </div>
                  ) : (
                    `Оплатить ₸${totalPrice.toLocaleString()}`
                  )}
                </button>

                <p className="text-xs text-gray-500 mt-3 text-center">
                  Нажимая "Оплатить", вы соглашаетесь с условиями использования
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main App Render
  return (
    <div className="font-sans">
      {currentStep === "search" && <SearchComponent />}
      {currentStep === "flights" && <FlightsListComponent />}
      {currentStep === "passenger-info" && <PassengerInfoComponent />}
      {currentStep === "payment" && <PaymentComponent />}
    </div>
  );
};

export default QazaqAirApp;

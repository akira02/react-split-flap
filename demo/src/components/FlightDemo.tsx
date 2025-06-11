import { useState, useEffect, useMemo } from 'react'
import { SplitFlap, LongFlap, Presets } from 'react-split-flap'

interface Flight {
  FlightNumber: string
  AirlineID: string
  FlightDate: string
  ScheduleDepartureTime: string
  EstimatedDepartureTime: string
  ActualDepartureTime: string | null
  Gate: string
  Terminal: string
  ArrivalAirportID: string
  DepartureRemark: string
}

const formatTime = (timeString: string) => {
  if (!timeString) return { hour: '--', minute: '--' }
  const date = new Date(timeString)
  const timeStr = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  const [hour, minute] = timeStr.split(':')
  return { hour, minute }
}

const getAirportName = (code: string) => {
  const airportNames: { [key: string]: string } = {
    NRT: 'Tokyo Narita',
    ICN: 'Seoul Incheon',
    KIX: 'Osaka Kansai',
    HKG: 'Hong Kong',
    BKK: 'Bangkok',
    SIN: 'Singapore',
    KUL: 'Kuala Lumpur',
    MNL: 'Manila',
    HAN: 'Hanoi',
    HND: 'Tokyo HND',
    PUS: 'Busan',
    NGO: 'Nagoya',
    OKA: 'Okinawa',
    FOC: 'Fuzhou',
    NGB: 'Ningbo',
    CGO: 'Zhengzhou',
    SDJ: 'Sendai',
    OIT: 'Oita',
    OKJ: 'Okayama',
    BKI: 'Kota Kinabalu',
    IST: 'Istanbul',
    // Add more as needed
  }
  return airportNames[code] || code
}

// Create status flaps for LongFlap
const getStatusFlaps = () => [
  {
    id: 'ontime',
    component: (
      <div
        style={{
          color: '#22c55e',
          fontWeight: 'bold',
          fontSize: '15px',
          textAlign: 'left',
          width: '100%',
        }}
      >
        準時 ON TIME
      </div>
    ),
  },
  {
    id: 'schedule_change',
    component: (
      <div
        style={{
          color: '#f59e0b',
          fontWeight: 'bold',
          fontSize: '12px',
          textAlign: 'left',
          width: '100%',
        }}
      >
        時間更改
        <br />
        SCHEDULE CHANGE
      </div>
    ),
  },
  {
    id: 'delay',
    component: (
      <div
        style={{
          color: 'red',
          fontWeight: 'bold',
          fontSize: '15px',
          textAlign: 'left',
          width: '100%',
        }}
      >
        延遲 DELAY
      </div>
    ),
  },
  {
    id: 'cancelled',
    component: (
      <div
        style={{
          color: '#ef4444',
          fontWeight: 'bold',
          fontSize: '15px',
          textAlign: 'left',
          width: '100%',
        }}
      >
        取消 CANCELLED
      </div>
    ),
  },
  {
    id: 'departed',
    component: (
      <div
        style={{
          color: '#6b7280',
          fontWeight: 'bold',
          fontSize: '15px',
          textAlign: 'left',
          width: '100%',
        }}
      >
        出發 DEPARTED
      </div>
    ),
  },
  {
    id: 'boarding',
    component: (
      <div
        style={{
          color: '#3b82f6',
          fontWeight: 'bold',
          fontSize: '15px',
          textAlign: 'left',
          width: '100%',
        }}
      >
        登機中 BOARDING
      </div>
    ),
  },
  {
    id: 'default',
    component: (
      <div
        style={{
          color: '#6b7280',
          fontWeight: 'bold',
          fontSize: '15px',
          textAlign: 'left',
          width: '100%',
        }}
      >
        --
      </div>
    ),
  },
]

// Get status ID for LongFlap
const getStatusId = (remark: string) => {
  if (remark.includes('準時') || remark.includes('ON TIME')) return 'ontime'
  if (remark.includes('時間更改') || remark.includes('SCHEDULE CHANGE')) return 'schedule_change'
  if (remark.includes('延遲') || remark.includes('DELAY')) return 'delay'
  if (remark.includes('取消') || remark.includes('CANCELLED')) return 'cancelled'
  if (remark.includes('出發') || remark.includes('DEPARTED')) return 'departed'
  if (remark.includes('登機') || remark.includes('BOARDING')) return 'boarding'
  return 'default'
}

const FlightDemo = () => {
  const [flights, setFlights] = useState<Flight[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [usingMockData, setUsingMockData] = useState(false)
  const flightsPerPage = 5

  // Memoize status flaps to prevent recreation on each render
  const statusFlaps = useMemo(() => getStatusFlaps(), [])

  // Mock flight data for demo when API fails
  const getMockFlights = (): Flight[] => [
    {
      FlightNumber: '835',
      AirlineID: 'CI',
      FlightDate: '2025-01-15',
      ScheduleDepartureTime: '2025-01-15T14:30:00',
      EstimatedDepartureTime: '2025-01-15T14:35:00',
      ActualDepartureTime: null,
      Gate: 'A12',
      Terminal: '1',
      ArrivalAirportID: 'NRT',
      DepartureRemark: '準時ON TIME',
    },
    {
      FlightNumber: '216',
      AirlineID: 'BR',
      FlightDate: '2025-01-15',
      ScheduleDepartureTime: '2025-01-15T15:45:00',
      EstimatedDepartureTime: '2025-01-15T16:00:00',
      ActualDepartureTime: null,
      Gate: 'B07',
      Terminal: '2',
      ArrivalAirportID: 'ICN',
      DepartureRemark: '延遲DELAY',
    },
    {
      FlightNumber: '721',
      AirlineID: 'JX',
      FlightDate: '2025-01-15',
      ScheduleDepartureTime: '2025-01-15T16:20:00',
      EstimatedDepartureTime: '2025-01-15T16:20:00',
      ActualDepartureTime: null,
      Gate: 'C03',
      Terminal: '1',
      ArrivalAirportID: 'KIX',
      DepartureRemark: '登機中BOARDING',
    },
    {
      FlightNumber: '564',
      AirlineID: 'CX',
      FlightDate: '2025-01-15',
      ScheduleDepartureTime: '2025-01-15T17:10:00',
      EstimatedDepartureTime: '2025-01-15T18:30:00',
      ActualDepartureTime: null,
      Gate: 'A08',
      Terminal: '1',
      ArrivalAirportID: 'HKG',
      DepartureRemark: '時間更改SCHEDULE CHANGE',
    },
    {
      FlightNumber: '635',
      AirlineID: 'TG',
      FlightDate: '2025-01-15',
      ScheduleDepartureTime: '2025-01-15T18:45:00',
      EstimatedDepartureTime: '2025-01-15T18:45:00',
      ActualDepartureTime: null,
      Gate: 'D05',
      Terminal: '2',
      ArrivalAirportID: 'BKK',
      DepartureRemark: '準時ON TIME',
    },
    {
      FlightNumber: '877',
      AirlineID: 'SQ',
      FlightDate: '2025-01-15',
      ScheduleDepartureTime: '2025-01-15T19:25:00',
      EstimatedDepartureTime: '2025-01-15T19:25:00',
      ActualDepartureTime: null,
      Gate: 'C12',
      Terminal: '1',
      ArrivalAirportID: 'SIN',
      DepartureRemark: '準時ON TIME',
    },
    {
      FlightNumber: '1598',
      AirlineID: 'AK',
      FlightDate: '2025-01-15',
      ScheduleDepartureTime: '2025-01-15T20:15:00',
      EstimatedDepartureTime: '2025-01-15T20:15:00',
      ActualDepartureTime: null,
      Gate: 'B02',
      Terminal: '1',
      ArrivalAirportID: 'KUL',
      DepartureRemark: '登機中BOARDING',
    },
    {
      FlightNumber: '941',
      AirlineID: 'VJ',
      FlightDate: '2025-01-15',
      ScheduleDepartureTime: '2025-01-15T21:00:00',
      EstimatedDepartureTime: '2025-01-15T21:00:00',
      ActualDepartureTime: null,
      Gate: 'A05',
      Terminal: '1',
      ArrivalAirportID: 'HAN',
      DepartureRemark: '準時ON TIME',
    },
    {
      FlightNumber: '214',
      AirlineID: 'IT',
      FlightDate: '2025-01-15',
      ScheduleDepartureTime: '2025-01-15T22:30:00',
      EstimatedDepartureTime: '2025-01-15T23:15:00',
      ActualDepartureTime: null,
      Gate: 'A07',
      Terminal: '1',
      ArrivalAirportID: 'OKJ',
      DepartureRemark: '延遲DELAY',
    },
    {
      FlightNumber: '692',
      AirlineID: 'KE',
      FlightDate: '2025-01-15',
      ScheduleDepartureTime: '2025-01-15T23:45:00',
      EstimatedDepartureTime: '2025-01-15T23:45:00',
      ActualDepartureTime: null,
      Gate: 'A01',
      Terminal: '1',
      ArrivalAirportID: 'PUS',
      DepartureRemark: '準時ON TIME',
    },
  ]

  // Fetch real flight data from TDX API
  const fetchFlights = async () => {
    setLoading(true)
    try {
      // Filter for flights that haven't departed yet (exclude DEPARTED status)
      const url =
        `https://tdx.transportdata.tw/api/basic/v2/Air/FIDS/Airport/Departure/TPE?` +
        `IsCargo=false&` +
        `$top=10&` +
        `$filter=DepartureRemark ne '出發DEPARTED'&` +
        `$select=FlightNumber,AirlineID,FlightDate,ScheduleDepartureTime,EstimatedDepartureTime,ActualDepartureTime,Gate,Terminal,ArrivalAirportID,DepartureRemark&` +
        `$format=JSON`

      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (data && Array.isArray(data)) {
        setFlights(data)
        setCurrentPage(0)
        setUsingMockData(false)
      } else {
        console.error('Invalid data format:', data)
        // Use mock data when API returns invalid format
        setFlights(getMockFlights())
        setCurrentPage(0)
        setUsingMockData(true)
      }
    } catch (error) {
      console.error('Error fetching flights:', error)
      // Use mock data when API fails
      setFlights(getMockFlights())
      setCurrentPage(0)
      setUsingMockData(true)
    } finally {
      setLoading(false)
    }
  }

  // Initialize with real data
  useEffect(() => {
    fetchFlights()
  }, [])

  // Auto rotate through pages
  useEffect(() => {
    if (flights.length <= flightsPerPage) return

    const totalPages = Math.ceil(flights.length / flightsPerPage)
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages)
    }, 10000) // Change page every 10 seconds

    return () => clearInterval(interval)
  }, [flights.length, flightsPerPage])

  // Get current page flights - memoized to prevent unnecessary re-renders
  const currentFlights = useMemo(
    () => flights.slice(currentPage * flightsPerPage, (currentPage + 1) * flightsPerPage),
    [flights, currentPage, flightsPerPage]
  )

  const totalPages = Math.ceil(flights.length / flightsPerPage)

  return (
    <div className="demo-section">
      <h2>機場航班看板</h2>

      <div style={{ marginBottom: '20px', padding: '10px', background: '#f5f5f5', borderRadius: '8px' }}>
        <button
          onClick={fetchFlights}
          disabled={loading}
          style={{
            padding: '8px 16px',
            borderRadius: '4px',
            border: 'none',
            background: '#3b82f6',
            color: 'white',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? '載入中...' : '重新整理航班資料'}
        </button>

        <small style={{ color: '#666', marginLeft: '10px' }}>
          共 {flights.length} 筆航班 • 頁面 {currentPage + 1}/{totalPages}
          {usingMockData && <span style={{ color: '#f59e0b', marginLeft: '8px' }}>• 使用模擬資料</span>}
        </small>
      </div>

      {currentFlights.length > 0 && (
        <div
          className="demo-display"
          style={{
            display: 'grid',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '200px 80px 300px 100px 150px',
              gap: '20px',
              padding: '10px',
              background: '#1a1a1a',
              color: '#ffffff',
              borderRadius: '8px 8px 0 0',
              fontWeight: 'bold',
              fontSize: '14px',
            }}
          >
            <div>Flight</div>
            <div>Gate</div>
            <div>Destination</div>
            <div>Time</div>
            <div>Status</div>
          </div>

          {/* Flight rows */}
          {currentFlights.map((flight, index) => (
            <div
              key={`${flight.FlightNumber}-${flight.AirlineID}-${flight.FlightDate}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '200px 80px 300px 100px 150px',
                gap: '20px',
                padding: '15px 10px',
                background: index % 2 === 0 ? '#2a2a2a' : '#1f1f1f',
                borderLeft: '4px solid #3b82f6',
              }}
            >
              {/* Flight Number */}
              <div>
                <SplitFlap
                  key={`flight-${flight.FlightNumber}-${flight.AirlineID}`}
                  value={flight.AirlineID + flight.FlightNumber}
                  chars={Presets.ALPHANUM}
                  length={6}
                  size="medium"
                  theme="dark"
                />
              </div>

              {/* Gate */}
              <div>
                <SplitFlap
                  key={`gate-${flight.FlightNumber}-${flight.AirlineID}`}
                  value={flight.Gate.trim() || '---'}
                  chars={Presets.ALPHANUM}
                  length={3}
                  size="medium"
                  theme="dark"
                  padMode="end"
                />
              </div>

              {/* Destination */}
              <div>
                <SplitFlap
                  key={`dest-${flight.FlightNumber}-${flight.AirlineID}`}
                  value={getAirportName(flight.ArrivalAirportID)}
                  chars={Presets.ALPHANUM}
                  length={9}
                  size="medium"
                  theme="dark"
                />
              </div>

              {/* Time */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <SplitFlap
                  key={`hour-${flight.FlightNumber}-${flight.AirlineID}`}
                  value={formatTime(flight.EstimatedDepartureTime || flight.ScheduleDepartureTime).hour}
                  chars={Presets.NUM}
                  length={2}
                  size="medium"
                  theme="dark"
                />
                <span style={{ color: '#ffffff', fontSize: '20px', fontWeight: 'bold' }}>:</span>
                <SplitFlap
                  key={`minute-${flight.FlightNumber}-${flight.AirlineID}`}
                  value={formatTime(flight.EstimatedDepartureTime || flight.ScheduleDepartureTime).minute}
                  chars={Presets.NUM}
                  length={2}
                  size="medium"
                  theme="dark"
                />
              </div>

              {/* Status */}
              <div>
                <LongFlap
                  key={`status-${flight.FlightNumber}-${flight.AirlineID}`}
                  flaps={statusFlaps}
                  displayId={getStatusId(flight.DepartureRemark)}
                  digitWidth={150}
                  digitHeight={35}
                  timing={30}
                  size="medium"
                  theme="dark"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {flights.length === 0 && !loading && (
        <div style={{ textAlign: 'center', color: '#666', padding: '40px' }}>點擊按鈕載入航班資料</div>
      )}

      {loading && <div style={{ textAlign: 'center', color: '#666', padding: '40px' }}>正在載入航班資料...</div>}
    </div>
  )
}

export default FlightDemo

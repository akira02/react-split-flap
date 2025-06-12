import { useState, useEffect, useMemo } from 'react'
import { SplitFlap, LongFlap, Presets } from 'react-split-flap'
import { useTranslation } from 'react-i18next'

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
    LAX: 'Los Angeles',
    JFK: 'New York JFK',
    CDG: 'Paris CDG',
    AMS: 'Amsterdam',
    LHR: 'London Heathrow',
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
        登機中 BOARDING
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
const flightSet1: Flight[] = [
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
    Gate: 'D15',
    Terminal: '2',
    ArrivalAirportID: 'BKK',
    DepartureRemark: '準時ON TIME',
  },
]

const flightSet2: Flight[] = [
  {
    FlightNumber: '102',
    AirlineID: 'SQ',
    FlightDate: '2025-01-15',
    ScheduleDepartureTime: '2025-01-15T09:15:00',
    EstimatedDepartureTime: '2025-01-15T09:45:00',
    ActualDepartureTime: null,
    Gate: 'A01',
    Terminal: '1',
    ArrivalAirportID: 'SIN',
    DepartureRemark: '延遲DELAY',
  },
  {
    FlightNumber: '88',
    AirlineID: 'MH',
    FlightDate: '2025-01-15',
    ScheduleDepartureTime: '2025-01-15T11:30:00',
    EstimatedDepartureTime: '2025-01-15T11:30:00',
    ActualDepartureTime: null,
    Gate: 'B05',
    Terminal: '2',
    ArrivalAirportID: 'KUL',
    DepartureRemark: '準時ON TIME',
  },
  {
    FlightNumber: '456',
    AirlineID: 'UA',
    FlightDate: '2025-01-15',
    ScheduleDepartureTime: '2025-01-15T13:20:00',
    EstimatedDepartureTime: '2025-01-15T13:20:00',
    ActualDepartureTime: null,
    Gate: 'C10',
    Terminal: '1',
    ArrivalAirportID: 'LAX',
    DepartureRemark: '登機中BOARDING',
  },
  {
    FlightNumber: '789',
    AirlineID: 'AF',
    FlightDate: '2025-01-15',
    ScheduleDepartureTime: '2025-01-15T19:50:00',
    EstimatedDepartureTime: '2025-01-15T19:50:00',
    ActualDepartureTime: null,
    Gate: 'D02',
    Terminal: '2',
    ArrivalAirportID: 'CDG',
    DepartureRemark: '取消CANCELLED',
  },
  {
    FlightNumber: '321',
    AirlineID: 'BA',
    FlightDate: '2025-01-15',
    ScheduleDepartureTime: '2025-01-15T22:10:00',
    EstimatedDepartureTime: '2025-01-15T23:30:00',
    ActualDepartureTime: null,
    Gate: 'A18',
    Terminal: '1',
    ArrivalAirportID: 'LHR',
    DepartureRemark: '時間更改SCHEDULE CHANGE',
  },
]
const FlightDemo = () => {
  const { t } = useTranslation()
  // State to manage which flight set each row should display
  const [rowFlightSets, setRowFlightSets] = useState<('set1' | 'set2')[]>(['set1', 'set1', 'set1'])

  // Memoize status flaps to prevent recreation on each render
  const statusFlaps = useMemo(() => getStatusFlaps(), [])

  // Get flight data for each row
  const getFlightForRow = (rowIndex: number): Flight | null => {
    const flightSet = rowFlightSets[rowIndex] === 'set1' ? flightSet1 : flightSet2
    return flightSet[rowIndex] || null
  }

  useEffect(() => {
    const interval = setInterval(() => {
      // Update rows sequentially with 500ms delay between each row
      setTimeout(() => {
        setRowFlightSets((prev) => [
          prev[0] === 'set1' ? 'set2' : 'set1', // Update first row
          prev[1],
          prev[2],
        ])
      }, 0)

      setTimeout(() => {
        setRowFlightSets((prev) => [
          prev[0],
          prev[1] === 'set1' ? 'set2' : 'set1', // Update second row
          prev[2],
        ])
      }, 4000)

      setTimeout(() => {
        setRowFlightSets((prev) => [
          prev[0],
          prev[1],
          prev[2] === 'set1' ? 'set2' : 'set1', // Update third row
        ])
      }, 8000)
    }, 12000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="demo-section">
      <h2>{t('sections.flight.title')}</h2>

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
        {/* Flight 1 */}
        {getFlightForRow(0) && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '200px 80px 300px 100px 150px',
              gap: '20px',
              padding: '15px 10px',
              background: '#2a2a2a',
              borderLeft: '4px solid #3b82f6',
            }}
          >
            {/* Flight Number */}
            <div>
              <SplitFlap
                value={getFlightForRow(0)!.AirlineID + getFlightForRow(0)!.FlightNumber}
                chars={Presets.ALPHANUM}
                length={6}
                size="medium"
                theme="dark"
              />
            </div>

            {/* Gate */}
            <div>
              <SplitFlap
                value={getFlightForRow(0)!.Gate.trim() || '---'}
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
                value={getAirportName(getFlightForRow(0)!.ArrivalAirportID)}
                chars={Presets.ALPHANUM}
                length={9}
                size="medium"
                theme="dark"
              />
            </div>

            {/* Time */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <SplitFlap
                value={
                  formatTime(getFlightForRow(0)!.EstimatedDepartureTime || getFlightForRow(0)!.ScheduleDepartureTime)
                    .hour
                }
                chars={Presets.NUM}
                length={2}
                size="medium"
                theme="dark"
              />
              <span style={{ color: '#ffffff', fontSize: '20px', fontWeight: 'bold' }}>:</span>
              <SplitFlap
                value={
                  formatTime(getFlightForRow(0)!.EstimatedDepartureTime || getFlightForRow(0)!.ScheduleDepartureTime)
                    .minute
                }
                chars={Presets.NUM}
                length={2}
                size="medium"
                theme="dark"
              />
            </div>

            {/* Status */}
            <div>
              <LongFlap
                flaps={statusFlaps}
                displayId={getStatusId(getFlightForRow(0)!.DepartureRemark)}
                digitWidth={150}
                digitHeight={35}
                timing={30}
                size="medium"
                theme="dark"
              />
            </div>
          </div>
        )}

        {/* Flight 2 */}
        {getFlightForRow(1) && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '200px 80px 300px 100px 150px',
              gap: '20px',
              padding: '15px 10px',
              background: '#1f1f1f',
              borderLeft: '4px solid #3b82f6',
            }}
          >
            {/* Flight Number */}
            <div>
              <SplitFlap
                value={getFlightForRow(1)!.AirlineID + getFlightForRow(1)!.FlightNumber}
                chars={Presets.ALPHANUM}
                length={6}
                size="medium"
                theme="dark"
              />
            </div>

            {/* Gate */}
            <div>
              <SplitFlap
                value={getFlightForRow(1)!.Gate.trim() || '---'}
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
                value={getAirportName(getFlightForRow(1)!.ArrivalAirportID)}
                chars={Presets.ALPHANUM}
                length={9}
                size="medium"
                theme="dark"
              />
            </div>

            {/* Time */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <SplitFlap
                value={
                  formatTime(getFlightForRow(1)!.EstimatedDepartureTime || getFlightForRow(1)!.ScheduleDepartureTime)
                    .hour
                }
                chars={Presets.NUM}
                length={2}
                size="medium"
                theme="dark"
              />
              <span style={{ color: '#ffffff', fontSize: '20px', fontWeight: 'bold' }}>:</span>
              <SplitFlap
                value={
                  formatTime(getFlightForRow(1)!.EstimatedDepartureTime || getFlightForRow(1)!.ScheduleDepartureTime)
                    .minute
                }
                chars={Presets.NUM}
                length={2}
                size="medium"
                theme="dark"
              />
            </div>

            {/* Status */}
            <div>
              <LongFlap
                flaps={statusFlaps}
                displayId={getStatusId(getFlightForRow(1)!.DepartureRemark)}
                digitWidth={150}
                digitHeight={35}
                timing={30}
                size="medium"
                theme="dark"
              />
            </div>
          </div>
        )}

        {/* Flight 3 */}
        {getFlightForRow(2) && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '200px 80px 300px 100px 150px',
              gap: '20px',
              padding: '15px 10px',
              background: '#2a2a2a',
              borderLeft: '4px solid #3b82f6',
            }}
          >
            {/* Flight Number */}
            <div>
              <SplitFlap
                value={getFlightForRow(2)!.AirlineID + getFlightForRow(2)!.FlightNumber}
                chars={Presets.ALPHANUM}
                length={6}
                size="medium"
                theme="dark"
              />
            </div>

            {/* Gate */}
            <div>
              <SplitFlap
                value={getFlightForRow(2)!.Gate.trim() || '---'}
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
                value={getAirportName(getFlightForRow(2)!.ArrivalAirportID)}
                chars={Presets.ALPHANUM}
                length={9}
                size="medium"
                theme="dark"
              />
            </div>

            {/* Time */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <SplitFlap
                value={
                  formatTime(getFlightForRow(2)!.EstimatedDepartureTime || getFlightForRow(2)!.ScheduleDepartureTime)
                    .hour
                }
                chars={Presets.NUM}
                length={2}
                size="medium"
                theme="dark"
              />
              <span style={{ color: '#ffffff', fontSize: '20px', fontWeight: 'bold' }}>:</span>
              <SplitFlap
                value={
                  formatTime(getFlightForRow(2)!.EstimatedDepartureTime || getFlightForRow(2)!.ScheduleDepartureTime)
                    .minute
                }
                chars={Presets.NUM}
                length={2}
                size="medium"
                theme="dark"
              />
            </div>

            {/* Status */}
            <div>
              <LongFlap
                flaps={statusFlaps}
                displayId={getStatusId(getFlightForRow(2)!.DepartureRemark)}
                digitWidth={150}
                digitHeight={35}
                timing={30}
                size="medium"
                theme="dark"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FlightDemo

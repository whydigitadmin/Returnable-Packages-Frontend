import BoltIcon from '@heroicons/react/24/outline/BoltIcon'
import HeartIcon from '@heroicons/react/24/outline/HeartIcon'


function PageStats({}){
    return(
        <div className="stats bg-base-100 shadow">
  
  <div className="stat">
    <div className="stat-figure invisible md:visible">
        <HeartIcon className='w-8 h-8'/>
    </div>
    <div className="stat-title">Latest Order</div>
    <div className="stat-value">567</div>
    <div className="stat-desc">21% more than last month</div>
  </div>
  
  <div className="stat">
    <div className="stat-figure invisible md:visible">
        <BoltIcon className='w-8 h-8'/>
    </div>
    <div className="stat-title">Last Receive Order</div>
    <div className="stat-value">234</div>
    <div className="stat-desc">14% more than last month</div>
  </div>
</div>
    )
}

export default PageStats
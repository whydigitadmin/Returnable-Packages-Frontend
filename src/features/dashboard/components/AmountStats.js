

function AmountStats({}){
    return(
        <div className="stats bg-base-100 shadow">
            <div className="stat">
                <div className="stat-title">Total Purchase Order</div>
                <div className="stat-value">1,600</div>
                <div className="stat-actions">
                    <button className="btn btn-xs">View Orders</button> 
                </div>
            </div>
            
            <div className="stat">
                <div className="stat-title">Pending Order</div>
                <div className="stat-value">1,450</div>
                <div className="stat-actions">
                    <button className="btn btn-xs">View Orders</button> 
                </div>
            </div>
        </div>
    )
}

export default AmountStats
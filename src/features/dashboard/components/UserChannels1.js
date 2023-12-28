import TitleCard from "../../../components/Cards/TitleCard"

const userSourceData = [
    {source : "1454567656", count : "CLEAN", conversionPercent : "12/02/2023" , conversionPercents : "12/02/2023"},
    {source : "3534645667", count : "CLEAN", conversionPercent : "15/05/2023" , conversionPercents : "12/02/2023"}, 
    {source : "6353456277", count : "CLEAN", conversionPercent : "02/05/2023", conversionPercents : "12/02/2023"},
    {source : "1342354543", count : "CLEAN", conversionPercent : "19/06/2023" , conversionPercents : "12/02/2023"},
    {source : "7454566566", count : "CLEAN", conversionPercent : "25/07/2023", conversionPercents: "12/02/2023"},
]

function UserChannels1(){
    return(
        <TitleCard title={"Recent Transaction Out"}>
             {/** Table Data */}
             <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th className="normal-case">Number</th>
                        <th className="normal-case">Status</th>
                        <th className="normal-case">Date</th>
                        <th className="normal-case">Effective date</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            userSourceData.map((u, k) => {
                                return(
                                    <tr key={k}>
                                        <th>{k+1}</th>
                                        <td>{u.source}</td>
                                        <td>{u.count}</td>
                                        <td>{u.conversionPercent}</td>
                                        <td>{u.conversionPercents}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </TitleCard>
    )
}

export default UserChannels1
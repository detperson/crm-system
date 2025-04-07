import { Button } from "antd"
import { EnumSortStatus, ITodoInfo } from "../types/todoTypes"

interface TodoSortingProps {
    todosInfo: ITodoInfo
    preload: (status?: EnumSortStatus) => Promise<void>
    filter: EnumSortStatus
    setFilter: React.Dispatch<React.SetStateAction<EnumSortStatus>>
}

const russification: Record<EnumSortStatus, string> = {
    [EnumSortStatus.ALL]: 'Все',
    [EnumSortStatus.INWORK]: 'в работе',
    [EnumSortStatus.COMPLITED]: 'сделано',
}

export default function TodoSorting({ todosInfo, preload, filter, setFilter }: TodoSortingProps) {
    
    function handleSortClick(sortTo: EnumSortStatus) {
        setFilter(sortTo)
        preload(sortTo)
    }

    return (
        <div className="sorting__list">
            <Button 
                size="large"
                variant="link"
                color={filter === EnumSortStatus.ALL ? "primary" : "default"}
                onClick={() => handleSortClick(EnumSortStatus.ALL)}
            >
                {russification[EnumSortStatus.ALL]} ({todosInfo.all})
            </Button>
            <Button 
                size="large"
                variant="link"
                color={filter === EnumSortStatus.INWORK ? "primary" : "default"}
                onClick={() => handleSortClick(EnumSortStatus.INWORK)}
            >
                {russification[EnumSortStatus.INWORK]} ({todosInfo.inWork})
            </Button>
            <Button 
                size="large"
                variant="link"
                color={filter === EnumSortStatus.COMPLITED ? "primary" : "default"}
                onClick={() => handleSortClick(EnumSortStatus.COMPLITED)}
            >
                {russification[EnumSortStatus.COMPLITED]} ({todosInfo.completed})
            </Button>
        </div>
    )
}
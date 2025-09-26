import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom"

export const GroupTC = observer(() => {
    const { groupId } = useParams();

    return (
        <div>Id groupTC: {groupId}</div>
    );
})
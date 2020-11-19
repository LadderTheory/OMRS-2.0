import { MissionListFunctions } from '../Components/ComponentFunctions/MissionListFunctions';
import {act, renderHook} from '@testing-library/react-hooks';
import MissionsService from '../services/missions.service';



describe("getAirLiftMsns", () => {
    it("Obtains a list of airlift missions from the database",  () => {
        const { result } = renderHook(MissionListFunctions)
        const { data } =  MissionsService.getAirLiftMsns()

        act(() => {
            result.current.getAirLiftMsns()
        })

        expect(result.current.missions).toBe([])
    })
});
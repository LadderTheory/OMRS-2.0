import React from "react";
import Calendar from "./Calendar";

//Input Mission Form
function InputMission()
{
    return(
        <div>
        <Calendar/>
        <form>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputMissionNumber">Mission #</label>
                    <input type="text" class="form-control" id="inputMissionNumber" placeholder="Mission #" name></input>

                </div>
                <div class="form-group col-md-6">
                    <label for="inputCallSign">CallSign</label>
                    <input type="text" class="form-control" id="inputCallSign" placeholder="CallSign"></input>

                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputSquadron">Squadron</label>
                    <input type="text" class="form-control" id="inputSquadron" placeholder="Squadron"></input>

                </div>
                <div class="form-group col-md-6">
                    <label for="inputAirframe">Airframe</label>
                    <input type="text" class="form-control" id="inputAirframe" placeholder="Airframe"></input>

                </div>

            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputSource">Source</label>
                    <input type="text" class="form-control" id="inputSource" placeholder="Source" name="Source"></input>

                </div>
                <div class="form-group col-md-6">
                    <label for="inputDestination">Destination</label>
                    <input type="text" class="form-control" id="inputDestination" placeholder="Destination"></input>

                </div>

            </div>
            <button type="submit" class="btn btn-dark btn-lg">Submit</button>
        </form>
        </div>
    );
}
export default InputMission;
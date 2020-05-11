function tracebackNextStep()
{
	//1. this function is called when whole sequenceTable is filled
	//2. call unmark(currentRow, currentCell) to clear formating in the sequenceTable, do it only once (or don't do it at all)
	//3. all rows and cells in sequenceTable are shifted by 2, first two rows/columns are occupied by headers
}

function tracebackPreviousStep()
{
	//1. this function is called when user click previousStepButton
	//2. when all steps of traceback are undonei, call fillPreviousStep() to "unfill" the sequenceTable
	//3. fillPreviousStep() needs diagonalOffset, horizontalOffset, currentRow and currentCell to be set properly, restore their former values if You changed them
}

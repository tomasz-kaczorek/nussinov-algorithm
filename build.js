var sequence;
var diagonalOffset;
var horizontalOffset;
var currentRow;
var currentColumn;

function buildSequenceTable()
{
	sequence = document.getElementById("sequenceInput").value;
	//reset offsets (they are used by filling algorithm)
	diagonalOffset = 0;
	horizontalOffset = 1;
	currentRow = undefined;
	currentCell = undefined;
	//get parent element
	body = document.body;
	//delete subresult table if necessery
	subresultTable = document.getElementById("subresultTable");
	if(subresultTable)
	{
		body.removeChild(subresultTable);
	}
	//check if table already exists and remove it if necessary
	sequenceTable = document.getElementById("sequenceTable");
	if(sequenceTable)
	{
		body.removeChild(sequenceTable);
	}
	//create (or recreate) a table
	sequenceTable = document.createElement("table");
	//ID is used for lookup above
	sequenceTable.setAttribute("id", "sequenceTable");
	//create table content, it has two cells more in both dimensions for headers
	sequenceTableBody = document.createElement("tbody");
	for(row = 0; row < sequence.length + 2; ++row)
	{
		sequenceTableRow = document.createElement("tr");
		for(column = 0; column < sequence.length + 2; ++column)
		{
			sequenceTableCell = document.createElement("td");
			sequenceTableRow.appendChild(sequenceTableCell);
		}
		sequenceTableBody.appendChild(sequenceTableRow);
	}
	sequenceTable.appendChild(sequenceTableBody);
	body.appendChild(sequenceTable);
	//prepare headers (row/column number and sequence character)
	for(index = 0; index < sequence.length; ++index)
	{
		sequenceTable.rows[0].cells[index + 2].appendChild(document.createTextNode(index + 1));
		sequenceTable.rows[index + 2].cells[0].appendChild(document.createTextNode(index + 1));
		sequenceTable.rows[1].cells[index + 2].appendChild(document.createTextNode(sequence[index]));
		sequenceTable.rows[index + 2].cells[1].appendChild(document.createTextNode(sequence[index]));
	}
	//blacken unused cells and fill "diagonals" with 0's
	for(row = 0; row < sequence.length; ++row)
	{
		for(column = 0; column < sequence.length; ++column)
		{
			sequenceTableCell = sequenceTable.rows[row + 2].cells[column + 2];
			sequenceTableCell.setAttribute("class", "white");
			if(row > column + 1)
			{
				sequenceTableCell.setAttribute("class", "black");
			}
			else if(row + 1 > column)
			{
				sequenceTableCell.appendChild(document.createTextNode(0));
			}
		}
	}
}

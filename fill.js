var sequence;
var diagonalOffset;
var horizontalOffset;
var currentRow;
var currentCell;

function fillNextStep()
{
	//check if whole table is filled and run traceback if that's true
	if(horizontalOffset > sequence.length - 1)
	{
		tracebackNextStep();
		return;
	}
	//clean after last step if it took place
	if(currentRow < currentCell + 1)
	{
		unmark(currentRow, currentCell);
	}
	//calculate new position
	currentRow = diagonalOffset + 2;
	currentCell = diagonalOffset + horizontalOffset + 2;
	//mark cells and build subresult table
	mark(currentRow, currentCell);
	fill(currentRow, currentCell);
	buildSubresultTable(currentRow, currentCell);
	//prepare next step position
	if(++diagonalOffset > sequence.length - horizontalOffset - 1)
	{
		diagonalOffset = 0;
		++horizontalOffset
	}
}

function fillPreviousStep()
{
	if(horizontalOffset == 1 && diagonalOffset == 1)
	{
		return;
	}
	unmark(currentRow, currentCell);
	clear(currentRow, currentCell);
	diagonalOffset = currentRow - 2;
	horizontalOffset = currentCell - currentRow;
	if(diagonalOffset > 0)
	{
		currentRow = diagonalOffset + 1;
		currentCell = diagonalOffset + horizontalOffset + 1;
	}
	else
	{
		currentRow = sequence.length - horizontalOffset + 2;
		currentCell = sequence.length + 1;
	}
	mark(currentRow, currentCell);
	buildSubresultTable(currentRow, currentCell);
}

function mark(row, cell)
{
	sequenceTable = document.getElementById("sequenceTable");
	//color neighboring cells	
	sequenceTable.rows[row].cells[cell].setAttribute("class", "blue");
	sequenceTable.rows[row].cells[cell - 1].setAttribute("class", "red");
	sequenceTable.rows[row + 1].cells[cell].setAttribute("class", "green");
	sequenceTable.rows[row + 1].cells[cell - 1].setAttribute("class", "yellow");
	//append notes to k-dependent cells
	for(k = row + 1; k < cell; ++k)
	{
		div = document.createElement("div");
		div.appendChild(document.createTextNode("k="));
		div.appendChild(document.createTextNode(k - 1));
		div.style.fontSize = "xx-small";
		element = sequenceTable.rows[row].cells[k];
		element.appendChild(div);

		div = document.createElement("div");
		div.appendChild(document.createTextNode("k="));
		div.appendChild(document.createTextNode(k - 1));
		div.style.fontSize = "xx-small";
		element = sequenceTable.rows[k + 1].cells[cell];
		element.appendChild(div);
	}
}

function unmark(row, cell)
{
	sequenceTable = document.getElementById("sequenceTable");
	//clear k-dependent cells
	for(k = row + 1; k < cell; ++k)
	{
		element = sequenceTable.rows[k + 1].cells[cell];
		element.removeChild(element.lastChild);
		element = sequenceTable.rows[row].cells[k];
		element.removeChild(element.lastChild);
	}
	//clear neighboring cells
	sequenceTable.rows[row + 1].cells[cell - 1].setAttribute("class", "white");
	sequenceTable.rows[row + 1].cells[cell].setAttribute("class", "white");
	sequenceTable.rows[row].cells[cell - 1].setAttribute("class", "white");
	sequenceTable.rows[row].cells[cell].setAttribute("class", "white");
}

function buildSubresultTable(row, cell)
{
	sequenceTable = document.getElementById("sequenceTable");
	body = document.body;
	subresultTable = document.getElementById("subresultTable");
	if(subresultTable)
	{
		body.removeChild(subresultTable);
	}
	subresultTable = document.createElement("table");
	subresultTable.setAttribute("id", "subresultTable");
	subresultTableBody = document.createElement("tbody");
	//create dummy row to ensure proper aligment
	subresultTableRow = document.createElement("tr");
	subresultTableCell = document.createElement("td");
	subresultTableCell.setAttribute("style", "width:200px");
	subresultTableRow.appendChild(subresultTableCell);
	
	subresultTableCell = document.createElement("td");
	subresultTableCell.setAttribute("style", "width:300px");
	subresultTableRow.appendChild(subresultTableCell);
	subresultTableBody.appendChild(subresultTableRow);
	
	subresultTableRow = document.createElement("tr");
	subresultTableCell = document.createElement("td");
	subresultTableCell.setAttribute("rowspan", (cell - row + 3));
	subresultTableCell.setAttribute("class", "blue");
	subresultTableCell.setAttribute("style", "vertical-align:middle");
	subresultTableCell.appendChild(document.createTextNode("\u03B3(" + (row - 1) + ", " + (cell - 1) + ") = max of"));
	subresultTableRow.appendChild(subresultTableCell);
	subresultTableBody.appendChild(subresultTableRow);
	//fill subresult table
	subresultTableRow = document.createElement("tr");
	subresultTableCell = document.createElement("td");
	subresultTableCell.appendChild(document.createTextNode("\u03B3(" + (row - 1) + ", " + (cell - 2) + ") = "));
	subresultTableCell.appendChild(document.createTextNode(sequenceTable.rows[row].cells[cell - 1].firstChild.nodeValue));
	subresultTableCell.setAttribute("class", "red");
	subresultTableRow.appendChild(subresultTableCell);
	subresultTableBody.appendChild(subresultTableRow);

	subresultTableRow = document.createElement("tr");
	subresultTableCell = document.createElement("td");
	subresultTableCell.appendChild(document.createTextNode("\u03B3(" + row + ", " + (cell - 1) + ") = "));
	subresultTableCell.appendChild(document.createTextNode(sequenceTable.rows[row + 1].cells[cell].firstChild.nodeValue));
	subresultTableCell.setAttribute("class", "green");
	subresultTableRow.appendChild(subresultTableCell);
	subresultTableBody.appendChild(subresultTableRow);

	subresultTableRow = document.createElement("tr");
	subresultTableCell = document.createElement("td");
	subresultTableCell.appendChild(document.createTextNode("\u03B3(" + row + ", " + (cell - 2) + ") + \u03B4(" + sequence[row - 2] + ", " + sequence[cell - 2] + ") = "));
	if(sequence[row - 2] == 'A' && sequence[cell - 2] == 'U') complementary = 1;
	else if(sequence[row - 2] == 'U' && sequence[cell - 2] == 'A') complementary = 1;
	else if(sequence[row - 2] == 'C' && sequence[cell - 2] == 'G') complementary = 1;
	else if(sequence[row - 2] == 'G' && sequence[cell - 2] == 'C') complementary = 1;
	else complementary = 0;
	subresultTableCell.appendChild(document.createTextNode(parseInt(sequenceTable.rows[row + 1].cells[cell - 1].firstChild.nodeValue) + complementary));
	subresultTableCell.setAttribute("class", "yellow");
	subresultTableRow.appendChild(subresultTableCell);
	subresultTableBody.appendChild(subresultTableRow);

	for(k = row + 1; k < cell; ++k)
	{
		subresultTableRow = document.createElement("tr");
		subresultTableCell = document.createElement("td");
		subresultTableCell.appendChild(document.createTextNode("\u03B3(" + (row -1) + ", " + (k - 1) + ") + \u03B3(" + k + ", " + (cell - 1) + ") = "));
		subresultTableCell.appendChild(document.createTextNode(parseInt(sequenceTable.rows[row].cells[k].firstChild.nodeValue) + parseInt(sequenceTable.rows[k + 1].cells[cell].firstChild.nodeValue)));
		subresultTableCell.setAttribute("class", "white");
		subresultTableRow.appendChild(subresultTableCell);
		subresultTableBody.appendChild(subresultTableRow);
	}
	subresultTable.appendChild(subresultTableBody);
	body.appendChild(subresultTable);
}

function fill(row, cell)
{
	max = 0;
	sequenceTable = document.getElementById("sequenceTable");

	value = parseInt(sequenceTable.rows[row].cells[cell - 1].firstChild.nodeValue);
	max = max > value ? max : value;

	value = parseInt(sequenceTable.rows[row + 1].cells[cell].firstChild.nodeValue);
	max = max > value ? max : value;

	if(sequence[row - 2] == 'A' && sequence[cell - 2] == 'U') complementary = 1;
	else if(sequence[row - 2] == 'U' && sequence[cell - 2] == 'A') complementary = 1;
	else if(sequence[row - 2] == 'C' && sequence[cell - 2] == 'G') complementary = 1;
	else if(sequence[row - 2] == 'G' && sequence[cell - 2] == 'C') complementary = 1;
	else complementary = 0;
	value = parseInt(sequenceTable.rows[row + 1].cells[cell - 1].firstChild.nodeValue) + complementary;
	max = max > value ? max : value;

	for(k = row + 1; k < cell; ++k)
	{
		value = (parseInt(sequenceTable.rows[row].cells[k].firstChild.nodeValue) + parseInt(sequenceTable.rows[k + 1].cells[cell].firstChild.nodeValue));
		max = max > value ? max : value;

	}
	sequenceTable.rows[row].cells[cell].appendChild(document.createTextNode(max));
}

function clear(row, cell)
{
	sequenceTable = document.getElementById("sequenceTable");
	sequenceTableCell = sequenceTable.rows[row].cells[cell];
	sequenceTableCell.removeChild(sequenceTableCell.firstChild);
}

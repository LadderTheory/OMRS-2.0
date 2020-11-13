//You can press Alt + z to get the text to wrap around within the VScode window, so you don't have to scroll along all the text as a single line of code.
//This is where the text is declared. The text itself will fill the text box naturally as a single paragraph, but if you want to add line breaks for indentation or to separate paragraphs, add a "\n" to indicate that break.
const text = 'This file will explain the functions within Data Management. This function is restricted to Admins only.\n\n-Step 1. On login, the first page that loads should be the "Missions" page. From here, mouse over the "Admin" link in the navbar, and in the dropdown menu there, select "Data Management". \n-Step 2. The Data Management page should load a second navigation bar that lists several different links. These are each of the parameters that will appear throughout the webpage as dropdown menus. \n-Step 3. Select the parameter you wish to manage.\n-Step 4. Once an item is selected, a list will appear of all the current items in the database under that specific parameter.\n\nAdd New Item\n-Step 1. If you wish to add another item to a list, simple click the "add item" button at the bottom of the list.\n-Step 2. A new window will pop up with a button to submit you new item, as well as a "cancel" button. This Cancel button simply closes the "add item" form.\n-Step 3. Once you enter your new item and check for accuracy, click the "submit" button to add it to the database. A messaeg should appear confirming the operation was successful. \n\nEdit or Delete Item\n-Step 1. If you want to edit an existing item in a list, then simply click the item in the list you wish to edit.\n-Step 2. On click, a new window will open that shows the current item selected and an empty text box, in addition to two buttons labelled "Edit" and "Deactivate".\n-Step 3. To edit the item, enter the information you want to change it to in the empty text box. Once your information has been entered and checked for accurcy, click the "Edit" button, and a confirmation message should appear.\n-Step 4. To deactivate an item, simply click the "Deactivate" button. This will remove the item from dropdown menus in the wep page, but keep the information in the database.\n\n-Note: Items that ppear in the list with a red flag next to them are inactive, and will not appear on any dropdown menus within the app.'

export default text;
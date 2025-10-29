## **Business Model**

**VCall** is an innovative communication platform built to keep you connected with ease and reliability. Whether for personal interactions or business collaborations. VCall delivers a full range of tools for smooth Voice /Video calling. With a focus on user-friendly design and superior connection quality, the app allows users to communicate seamlessly and collaborate efficiently, no matter where they are.

## Customer App

### **LOGIN**

- **Ui Layout**
  - **Phone Number Input Field**: A clearly labeled input field for the user to enter their phone number. This field should be the central focus of the page, placed directly below the top image section.
  - **Top Image Section**: A visually appealing image representing the app's theme, branding, or purpose. The image should be centered and span the top portion of the screen. It should convey a sense of trust and professionalism.
  - **Get OTP Button**: A button labeled "Get OTP" or similar, placed directly below the phone number input field. When pressed, this button triggers the process of sending a one-time password (OTP) to the user's phone number.
  - **Terms and Conditions Text**: A brief statement indicating that by logging in, the user agrees to the app's terms and conditions. This should be placed below the "Get OTP" button with a link to the full terms and conditions.
- **EXPECTED SYSTEM BEHAVIOUR:**
  - **Phone Number Verification**: The user enters their phone number into the input field. The system verifies that the phone number is in a valid format before proceeding.
  - **OTP Generation**: Upon pressing the "Get OTP" button, the system generates a one-time password (OTP) and sends it to the provided phone number via SMS. This process should be secure and adhere to relevant privacy regulations.
  - **OTP Input Page**: The system then redirects the user to a new page or screen where they can enter the OTP. The OTP input page should have a similar design language, with a timer indicating the OTP’s validity period and an option to resend the OTP.
  - **Authentication**: Once the OTP is entered, the system validates it. If the OTP is correct, the user is authenticated and granted access to the app. If the OTP is incorrect, the system prompts the user to try again or request a new OTP.
  - **Error Handling**: The system should provide clear and user-friendly error messages for issues such as invalid phone numbers, OTP not matching, OTP expiration, or SMS delivery failure.
  - **Page Navigation :** When a new user logs in, they are redirected to the sign-up page. If an existing registered user logs in, they are redirected to the dashboard.

### **Sign Up Page**

- **UI LAYOUT:**
  - **Text Fields:** User name, Pass code, Confirm Pass code
  - **Drop down:** State Listing
  - **Submit Button:** For Saving customer details
- **EXPECTED SYSTEM BEHAVIOUR:**
  - **Text Fields:**
    - **User name**: Collects the user's chosen name or identifier.
    - **Pass code**: Collects the user's password or passcode, ensuring security.
    - **Confirm Pass code**: Verifies that the user has entered the correct passcode by requiring a second input, reducing the likelihood of errors.
  - **Drop down:**
    - **State Listing**: Allows the user to select their state from a predefined list. This ensures consistent input for location data, often necessary for regional verification or services.
  - **Submit Button:**
    - **For Saving Customer Details**: After filling out the form, this button is used to submit the user's information, potentially saving it to a database or verifying the details against existing records.

## Dashboard

This dashboard seems designed for a platform where users can interact with or hire individuals (referred to as "ladies" in this case). The coins serve as the currency for transactions, and the filter system allows users to refine their search based on preferences.

- **UI LAYOUT:**
  - **Profile Icon:**
  - **Refresh Button :**
  - **Add Coins Button & Available coin count**
  - **All Ladies Listing ( Including Active ,Busy & Offline ladies) :** Ladies Name, Rating ,Call button, Rating & feedback Section ,Follow button & Block Option)
  **Note :** Ladies should be displayed in a random order, with no regard to alphabetical or rating-based arrangement
  - **Filter Section:** Option like “All”, “Professions” and “Normal”
  - **Filter Section** : Ladies name, Language , Gender, Voice / Video call
- **EXPECTED SYSTEM BEHAVIOUR:**
  - **Profile Icon:**
    - This is likely a shortcut to the user's profile where they can view or manage their personal information, settings, and preferences.
  - **Refresh Button:**
    - The purpose of a "Refresh" button is to reload the content on a application to reflect the most current data or state.
  - **Add Coins Button & Available Coin Count:**
    - **Add Coins Button**: Allows the user to purchase or add more coins to their account. **(**When user click on add coin Button its redirecting to plan listing page ,user can able to add new plan))
    - **Available Coin Count**: Displays the current number of coins the user has. Coins might be used as currency within the platform for purchasing services or interacting with the active listings.
  - **All Ladies Listing:**
    - **Ladies Name**: Shows the names of the All ladies ( Including Active ,Busy & Offline ladies)
    - **Rating**: Displays the rating of each lady, likely based on user feedback or interaction quality.
    - **Active/Inactive or Busy**: Indicates whether the individual is currently available for interaction or services.
    - **Rate**: Shows the cost (possibly in coins) for interacting with or hiring the lady per minute
    - **Call Button**: A direct way for users to initiate a call with the listed lady, likely deducting the necessary coins upon interaction.
    **Note :** If a customer calls a girl and she doesn't answer, her status should automatically switch from online to offline. Voice calls and video calls are priced differently: video calls cost 450 coins, whereas voice calls cost 150 coins.
    - **Rating& Feedback Section** : After a call Rating& Feed back section should display & User should able to rate the call & user can update feedback. Feedback content should be displayed on the page, such as 'Good,' 'Bad,' etc.
    - **Page Navigation** : When user click on call button it turning a call
    - **Follow Button** : User can able to Follow a lady when user click on Follow button. After following, the Follow button changes to an Unfollow button, allowing the user to unfollow from there.
    - **Block Button :**The purpose of a "Block" button is to prevent further interaction from a specific user
    - **Notification To customer** : When the followed ladies is active send a notification to customer
  - **Filter Section for All, Professional & Normal:**
    - Provides filtering options to view different categories of individuals:
      - **All**: Displays all available ladies.
      - **Professional**: Filters the list to show only those categorized as professional (perhaps based on experience or service quality).
      - **Normal**: Filters the list to show non-professional individuals or those categorized as offering standard services.
  - **Filter Section** : It contain Ladies name, Language , Gender, Voice / Video call fields . User can able to filter ladies using Language , Gender & Voice / Video call

### My Account Page

The **"My Account"** section is designed to give users control over their personal and account-related information. It allows them to manage their profile, track their coin balance, review their activity history (calls and purchases), and access support or policy information. It enhances user convenience by organizing essential features and services in one place for easy access and management.

**Note:** The "My Account" module serves as the main section, containing several submodules: Profile, My Balance, Call History, Purchase History, Help, About Us, Privacy Policy, and Logout. When a user clicks on any of these submodules, they are redirected to the corresponding page.

- **UI LAYOUT :**
  - **Profile Pic:** Place Holder
  - **Customer Basic Details** : Customer Name, Mobile No
  - **Sub Modules:** Profile**,** My Balance (Coins), Call History , Purchase History, Help, About us, Privacy policy & Logout
- **EXPECTED SYSTEM BEHAVIOUR:**
  - Customer Basic Details:
  - **Customer Name**: Displays the user's name, allowing them to quickly confirm their identity or personalize the account.
  - **Mobile No**: Shows the registered phone number associated with the user's account, possibly for communication, verification, or notifications.
  - Sub Modules:
    - **Profile**: Allows the user to view or update personal information like name, contact details, or other profile settings.
    - **My Balance (Coins)**: Displays the current balance of virtual coins in the user’s account, allowing them to track how many coins they have for transactions or services.
    - **Call History**: Logs the user’s previous calls, showing details such as call duration, the person called, and potentially the cost in coins. This helps in tracking interactions and usage.
    - **Purchase History**: Shows records of past purchases, including coin transactions, providing transparency and tracking for any financial activities on the platform.
    - **Help**: Offers assistance or support options, such as FAQs, troubleshooting guides, or ways to contact customer service.
    - **Privacy Policy**: Outlines how the platform handles user data, ensuring transparency regarding user privacy and compliance with regulations.
    - **About Us**: Provides information about the platform, its mission, services, and perhaps the team behind it.
    - **Logout**: Allows the user to securely sign out of their account, protecting their personal information and preventing un authorised access.

### **Profile Page**

- **UI LAYOUT:**
  - **Text field:** User Name
  - **Drop Down:** State
  - **Edit Profile Button:** To update profile details
- **EXPECTED SYSTEM BEHAVIOUR :**
  **Text Field:**
  - **User Name**: Displays the current user name associated with the account, allowing the user to view or potentially edit this information.
  **Drop Down:**
  - **State**: Displays a list of states for the user to select or update their location information. This is important for location-based services or regional identification.
  **Edit Profile Button:**
  - **To Update Profile Details**: When clicked, this button allows users to make changes to their user name, state, or other profile information. It enables the user to keep their account information current.
  **Navigate To** : When user Click on Profile from My account its redirecting to Edit Profile page

### **My Balance (Coins) Page**

- **UI LAYOUT:**
- **Add Coin Button & Customer care WhatsApp number** : When click on add coin button its redirecting to plan listing page & user can able to add new plans . User can able to contact customer care when user have any issue in payment.
- **Transaction History** : Amount detail per call
- **Current Amount or Balance Amount view**
- **EXPECTED SYSTEM BEHAVIOUR :**
  - **Amount Detail per Call**: Displays a detailed log of each transaction, specifically showing how many coins or how much money was spent per call. This allows users to track their spending, see which interactions have cost them coins, and monitor their usage over time.
  - **Current Amount or Balance Amount View:** Displays the current total balance of coins or money in the user’s account. This helps users quickly understand how many coins they have left for future transactions or services.
  - **Add Coin Button & Customer care WhatsApp number** : When click on add coin button its redirecting to plan listing page & user can able to add new plans . User can able to contact customer care when user have any issue in payment.

**Navigate To** : When user Click on My Balance from My account its redirecting to My Balance page

### **Call History Page**

- **UI LAYOUT :**
  - **Call List :** Person ,Duration ,Date & time & cost are listed in Call list
- **EXPECTED SYSTEM BEHAVIOUR :**
  - **Call List:**
    - **Person**: Displays the name or identifier of the individual with whom the user had the call. This helps users recall past interactions and identify who they communicated with.
    - **Duration**: Shows the length of each call, allowing users to see how long they spent on each interaction. This can be useful for understanding usage patterns or for budgeting time.
    - **Cost**: Displays the cost in coins (or currency) associated with each call. This helps users track their spending and manage their balance more effectively.
  **Navigate To** : When user Click on Call History from My account its redirecting to Call History page

### **Purchase History**

- **UI LAYOUT :**
  - **ADD COIN BUTTON**: When click on add coin button its redirecting to plan listing page & user can able to add new plans
  - **Purchase List :** Plan Name, Cost, Date
- **EXPECTED SYSTEM BEHAVIOUR :**
  - **Add Coin Button:**
    - **Functionality**: When the user clicks this button, they are redirected to a **plan listing page**, where they can view and select different options for purchasing coins or plans. This allows users to easily add more coins to their account for future use.
  - **Purchase List:**
    - **Plan Name**: Displays the name of the plan or coin package that the user purchased. This helps users identify what they have bought.
    - **Cost**: Shows the amount of coins or money spent on each plan, providing transparency regarding expenditures.
    - **Date**: Indicates when each purchase was made, allowing users to track their spending over time and manage their budget.
    **Navigate To** : When user Click on Purchase History from My account its redirecting to Purchase History page

**Following List :** The List Contain following ladies . It includes Ladies name , Coin & Unfollow Button

**Help Page:** Offers assistance or support options, such as FAQs, troubleshooting guides, or ways to contact customer service. (Ticket System)

**About us Page** :Provides information about the platform, its mission, services, and perhaps the team behind it.

**Privacy policy Page :** Outlines how the platform handles user data, ensuring transparency regarding user privacy and compliance with regulations.

**Logout :** Allows the user to securely sign out of their account, protecting their personal information and preventing unauthorized access.

**Other Expectations :**The app does not allow screenshots or screen recordings.

---

## Ladies App

### **Login**

- **UI LAYOUT :**
  - **Text Fields:** User name , Password (User name & password is created through admin )
  - **Login Button** : For Login the app (When pressed, the system verifies the entered credentials. If valid, it grants access to the app's main interface; if invalid, it shows an error message.)
  - **Terms & Conditions Checkbox**: Login is only allowed when the user selects the terms and conditions.
- **EXPECTED SYSTEM BEHAVIOUR :**The login page is designed to authenticate users, ensuring that only those with admin-created credentials can log into and access the app's features and services.

### **Dashboard**

- **UI LAYOUT :**
  - **Profile Icon :**
  - **Offline/Online Toggle Button :**
  - **Available Coin count :**
  - **Incoming Call :**
- **EXPECTED SYSTEM BEHAVIOUR :**
  - **Profile Icon**: A clickable icon where the user can view and manage their account details, such as personal information, profile settings, and preferences.
  - **Offline/Online Toggle Button**: Allows the user to switch between **online** (available for work) and **offline** (unavailable).
  - **Available Coin Count** : Displays the user’s current coin or credit balance. Coins could represent earnings, incentives, or a rewards system that tracks the user’s progress or achievements in the system. Free & Normal call coins should display separately.(Eg : Free call silver & Normal or paid call gold coin )
  - **Incoming Call**: Displays real-time notifications for incoming requests or calls. This allows the user to immediately respond to Calls . Don't credit coins if they get a call from testing id.
  **Note :**If a customer calls a Lady and she doesn’t answer, her status will automatically switch from online to offline. She can manually change her status back to online .Voice calls and video calls have different rates: video calls earn 450 coins, whereas voice calls earn 150 coins; these amounts will be credited to the ladies.

### **Profile**

- **UI LAYOUT:**
  - **Profile Name /User name**
  - **Submodules :** Call History ,Wallet, Help & About Us
- **EXPECTED SYSTEM BEHAVIOR :** The **Profile module** is designed to give users control over their personal information and access to essential tools that support their interactions with the platform. It helps ensure a seamless user experience by providing easy access to history, financial management, and support services.

### **Call History**

- **UI LAYOUT:**
  - **Call list** : Duration ,User name ,Credited coin & Time & date
  - **Delete Button** : For deleting Call history

**EXPECTED SYSTEM BEHAVIOUR:**

- **Call List**:
  - **Duration**: Displays how long the call lasted, providing insight into the length of the interaction.
  - **Username**: Shows the name of the person or user with whom the call was made, making it easy to identify the other party.
  - **Credited Coin**: Displays the number of coins earned or credited for the call. This incentivizes users and offers transparency regarding rewards or payments.
  - **Time & Date**: Indicates when the call took place, allowing users to track their history and reference specific calls.
- **Delete Button**:
  - Allows users to delete specific call records from the history, giving them control over their data. This can be useful for privacy, organization, or decluttering purposes.

### **Wallet**

- **UI LAYOUT :**
  - **Section : 1**
    - Wallet Amount : Total Credited amount displayed
    - Transactions : Credited amount ,Time
    - Withdraw Button : For withdraw the amount (When a new user clicks the withdraw button, the account addition form is displayed. If a user with an already added account clicks the withdraw button, they will see a list of their saved bank accounts and can select one to proceed.)
  - **Section: 2**
    - Account details add form : Holder name, Account No, IFSC Code, Branch
    - Submit Button : To save bank details
  Note : Withdraw is working automatically in Amount wise ( That amount is added from admin & user can able to update the amount )
- **EXPECTED SYSTEM BEHAVIOUR :**
  - **Section 1:**
    - **Wallet Amount**: Displays the **total credited amount** available in the user's wallet. This is the total balance that the user has earned and can withdraw.
    - **Transactions**: Shows a list of past transactions, including **credited amounts** and the **time** they were received, allowing users to review their earnings history.
    - **Withdraw Button**: Initiates the withdrawal process, allowing the user to transfer funds from the wallet to their bank account .When a new user clicks the withdraw button, the account addition form is displayed. If a user with an already added account clicks the withdraw button, they will see a list of their saved bank accounts and can select one to proceed.
  - **Section 2:**
    - **Account Details Add Form**: **Holder Name, Account No, IFSC Code, Branch**: This form is used to add and save the user's bank account details, which are required for withdrawing money. These fields ensure that the correct bank information is provided for successful transfers.
    - **Submit Button** (for bank details): Saves the user's bank details to be used for future withdrawals. Once submitted, the details are stored for quick access during the withdrawal process.

**Followers List :** The List Contain followers . It includes Customer name & remove Button \*\*\*\*

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           **Help Page :** It helps users troubleshoot any technical problems they might face, such as login issues, payment problems, or difficulties using specific features, reducing the need for direct support calls.

**About Us Page :** The purpose of the **About Us** page is to provide users with information about the organization & Version

**Other Expectations :**The app does not allow screenshots or screen recordings.

---

## Admin

### **User Management**

- The purpose of this module includes managing various aspects of customer-related data, such as profile information, Call history, and payment details. This ensures accurate record-keeping, personalized service, and efficient handling of billing and customer interactions.
- **UI Layout:**
  - **Filter Section :**
    - **Text field** : Customer Name ,Phone number
    - **Clear Button** : For clearing the text field
    - **Submit Button** : For filtering User details
    - **Customer list** : List of customer details . Customer Name, Phone Number &Customer State, Customer detail button
- **Customer Details Page:**
- Ui Layout
  - **Basic details**
    - It contains Customer ID , Customer Name, Phone Number & State ,Current coin amount
  - **Transaction history**
    - It contain Data & Time, Customer Name , Transaction ID, Amount ,Plan name, Payment Method & Status
  - **Call History:**
    - It contains Ladies Name, Duration , Coins ,Time & Date

### **Ladies Management**

- **Add Ladies** : Add new Ladies, View, delete and update Ladies details such as name, contact information ,User name & password .(When the user clicks "Add Ladies " in the side menu, they are redirected to the Ladies Listing page. This page shows a list of existing Ladies and includes an "Add" button for adding new Ladies . The user can delete or update Ladies from the listing.)
- **UI Layout :**
  - **Filter Section :** Text fields **: (**Ladies name , State ),Drop down (Status & types (professionals & normal),Clear button & submit button
  - **Add button**: For adding new Ladies
  - **Ladies list**: Newly added Ladies is listed in Ladies list
  - List contain SI No , Ladies name ,Email ,Active/Inactive ,Action field (Edit & Delete button),Detail Button
  - **Ui Layout:**
    - Detail page Contain: Basic details , Call Logs & Transaction details)
    - Basic details
      - It contains Customer Name, Phone Number & State ,Current coin amount
    - Transaction history
      - It contain Data & Time, Customer Name , Transaction ID, Amount
    - Call History .
      - It contains Customer Name, Duration , Coins ,Time& Date
- **Add Ladies** **form:**
  - Text fields: Ladies name , SI No, Email & password ,State, Active/ Inactive
  - Clear Button: For clearing the text field
  - Save Button: For save new Rider

### Basic Settings

The basic settings module is designed to add and update rates for ladies based on professionals and regular ladies.

- **UI Layout :**
  - Professional Ladies Settings :
    - Text Fields : Rate/coins
    - Clear Button : For clear the text fields
    - Submit Button :For add rate for professionals & update
  - Normal Ladies Settings :
    - Text Fields : Rate/coins
    - Clear Button : For clear the text fields
    - Submit Button :For add rate for Normal & update

### **Revenue Management**

The purpose of a revenue management module is to maximize a business's revenue potential. (Add 2 payment gateway )

- **UI Layout :**
  - **Filter section** :
    - Text Fields : Plan name , From date & To date
    - Clear Button : For clear the text fields
    - Submit Button :For filtering transaction details
  - **Transaction list** : All Transactions is listed in transaction list
  - List contain SI No, Date & Time, Customer Name , Amount , Status (Completed, Pending) &Plan name
  - **Withdraw Settings** : User can able to set a fixed withdraw amount from admin & user can able to update the amount

### **Call Logs**

It logs details of each call such as date, time, duration, recipients etc.

- **UI Layout :**
  - **Filter section** :
    - Text Fields : Phone Number , From date & To date
    - Clear Button : For clear the text fields
    - Submit Button :For filtering call log details
  - **Call log list** : All Call log is listed in Call log list
  - List contain SI No, Date & Time, Customer Name ,Recipient ,Amount or Coin & Duration

### **Ticket Management**

- Customer & Ladies created tickets are listed ,Monitor and respond to support tickets
- **UI Layout:**
  - Ticket Listing : Customer & Ladies created tickets are listed .It contain Name, Phone number, Ticket details

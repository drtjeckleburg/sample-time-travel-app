# sample-time-travel-app

The goal of this project is to demonstrate how fluree's time-travel functionality can be integrated into the front end of a distributed application. The steps to reproduce are below. If at any point you feel stuck, lost, need help, or alone in the universe join the [fluree discord server](https://discord.com/invite/pgjsvPa9Nm) to get help from me & our community.

1. After cloning repository, create a new fluree ledger. You can do this via the nexus UI ([directions](https://developers.flur.ee/docs/nexus/getting-started/create-new-dataset/)) or via the `create` API ([directions](https://developers.flur.ee/docs/reference/http-api/#flureecreate)), note that if you want to hit the `create` API you will first need to deploy fluree locally - the instructions are [here](https://flur.ee/fluree-blog/deploying-fluree-crawl-walk-run/#:~:text=Local,-Crawl&text=If%20you%20have%20Docker%20Desktop,Fluree%20without%20installing%20anything%20else.&text=This%20will%20start%20an%20ephemeral,to%20see%20the%20admin%20UI.). And, while reading these you will probably think to yourself "wow! what a concise and helpful piece of documentation" why thanks friend! I wrote them :D

2. One you have a dataset_id (this is either the name of the ledger you created with the api OR listed in the Getting Started notebook automatically generated on nexus) go ahead assign the 'dataset_id' value in time-travel-data/main.py.

3. IF YOU ARE USING NEXUS you will need to [generate an api key](https://developers.flur.ee/docs/nexus/topics/integrating-clients-with-datasets/). If you are deploying locally... don't worry about it!

4. Transact a whole bunch of data: luckily I have made this super easy for you - all you have to do is run `python main.py`. Once triggered, this script will transact the [World Happiness Report Dataset](https://data.world/laurel/world-happiness-report-data) in such a way that each transaction will consist of ONLY data from a single year, and will delete all data in the ledger prior to transacting.

5. Stand up the app! Now that all your data is in the ledger it's time to play around with it. Navigate to the `react-app` portion of the code base and run `npm run dev`, and then follow the `localhost:...` link that will appear in your console. By moving the toggle at the top of the screen, you can watch your data change real-time as the value of the toggle changing will trigger a time travel query in the backend.

To learn more about the fundamentals behind fluree's time travel capabilities, check out [this article](https://next.developers.flur.ee/docs/learn/foundations/verifiable-data/) on the topic.

And to learn how to construct time travel queries yourself, check out [this section](https://next.developers.flur.ee/docs/reference/history-syntax/#constraints-on-time) of the reference docs.

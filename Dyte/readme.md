### Log Ingestor and Query Interface README

#### How to Run the Project

**Backend:**

1. Navigate to the `server` directory.
2. Run `npm run dev` to start the server. It will run on `http://localhost:3000`.

**Frontend:**

1. Go to the `client` directory.
2. Execute `npm start` to launch the frontend. Access it through `http://localhost:3001`.

#### System Design

The system comprises a log ingestor and a query interface, designed to efficiently manage and retrieve vast volumes of log data. The log ingestor operates via an HTTP server, ingesting logs in a structured JSON format. MongoDB, a NoSQL database, stores the log data, utilizing indexing for optimized query performance.

#### Features Implemented

1. **Log Ingestor:**
   - **Efficient Log Ingestion:** Accommodates high log volumes by optimizing I/O operations and leveraging MongoDB's capabilities for rapid writes.
   - **Scalability:** Ensures scalability to handle increasing log data through indexing strategies.
   - **Database Indexing:** Strategically indexes log attributes like timestamp, resourceId, and traceId for faster query execution.

2. **Query Interface:**
   - **Multi-Filtering:** Provides filters based on various log attributes, allowing combinations for more refined searches.
   - **Search within Specific Date Ranges:** Implements timestamp-based filtering for retrieving logs within defined date ranges.

#### Database Indexing and Fast Result Retrieval

The system's performance is enhanced by utilizing MongoDB's indexing features. Indexing critical log attributes like timestamps ensures faster query execution. The database's indexing strategy significantly reduces query execution time, allowing for quick retrieval of logs, especially when filtering based on timestamps or specific log attributes.

#### Multi-Search Feature

The multi-search feature allows users to combine various filters for comprehensive log retrieval. By offering a flexible query interface that supports combining filters, users can refine their searches effectively. This capability enhances the system's usability, enabling complex searches across different log attributes simultaneously.

#### Identified Issues

While no major issues were detected during implementation, further enhancements are under consideration to optimize database indexing strategies for even faster query performance, especially with the exponential growth of log data.And few more bonus features can be added later.

---

The system leverages MongoDB's indexing capabilities for efficient log retrieval, focusing on enhancing query performance through strategic indexing. Additionally, the multi-search feature and database indexing optimizations ensure a user-friendly and responsive system capable of handling extensive log data efficiently.
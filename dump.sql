--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8 (Ubuntu 16.8-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.8 (Ubuntu 16.8-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: exchange_history; Type: TABLE; Schema: public; Owner: dosia
--

CREATE TABLE public.exchange_history (
    id integer NOT NULL,
    sender_id integer,
    receiver_id integer,
    plant_id integer,
    exchange_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.exchange_history OWNER TO dosia;

--
-- Name: exchange_history_id_seq; Type: SEQUENCE; Schema: public; Owner: dosia
--

CREATE SEQUENCE public.exchange_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.exchange_history_id_seq OWNER TO dosia;

--
-- Name: exchange_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dosia
--

ALTER SEQUENCE public.exchange_history_id_seq OWNED BY public.exchange_history.id;


--
-- Name: exchange_offers; Type: TABLE; Schema: public; Owner: dosia
--

CREATE TABLE public.exchange_offers (
    id integer NOT NULL,
    sender_id integer,
    receiver_id integer,
    plant_id integer,
    status character varying(50) DEFAULT 'pending'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.exchange_offers OWNER TO dosia;

--
-- Name: exchange_offers_id_seq; Type: SEQUENCE; Schema: public; Owner: dosia
--

CREATE SEQUENCE public.exchange_offers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.exchange_offers_id_seq OWNER TO dosia;

--
-- Name: exchange_offers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dosia
--

ALTER SEQUENCE public.exchange_offers_id_seq OWNED BY public.exchange_offers.id;


--
-- Name: plants; Type: TABLE; Schema: public; Owner: dosia
--

CREATE TABLE public.plants (
    id integer NOT NULL,
    user_id integer,
    name character varying(100) NOT NULL,
    species character varying(100),
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    region character varying(50)
);


ALTER TABLE public.plants OWNER TO dosia;

--
-- Name: plants_id_seq; Type: SEQUENCE; Schema: public; Owner: dosia
--

CREATE SEQUENCE public.plants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.plants_id_seq OWNER TO dosia;

--
-- Name: plants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dosia
--

ALTER SEQUENCE public.plants_id_seq OWNED BY public.plants.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: dosia
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO dosia;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: dosia
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO dosia;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dosia
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: exchange_history id; Type: DEFAULT; Schema: public; Owner: dosia
--

ALTER TABLE ONLY public.exchange_history ALTER COLUMN id SET DEFAULT nextval('public.exchange_history_id_seq'::regclass);


--
-- Name: exchange_offers id; Type: DEFAULT; Schema: public; Owner: dosia
--

ALTER TABLE ONLY public.exchange_offers ALTER COLUMN id SET DEFAULT nextval('public.exchange_offers_id_seq'::regclass);


--
-- Name: plants id; Type: DEFAULT; Schema: public; Owner: dosia
--

ALTER TABLE ONLY public.plants ALTER COLUMN id SET DEFAULT nextval('public.plants_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: dosia
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: exchange_history; Type: TABLE DATA; Schema: public; Owner: dosia
--

COPY public.exchange_history (id, sender_id, receiver_id, plant_id, exchange_date) FROM stdin;
2	\N	\N	\N	2025-04-05 15:00:25.794816
3	\N	\N	\N	2025-04-05 15:23:29.423009
5	2	4	9	2025-04-07 00:42:08.557197
6	2	4	23	2025-04-07 00:42:30.630898
39	6	3	24	2025-04-07 13:58:41.378481
\.


--
-- Data for Name: exchange_offers; Type: TABLE DATA; Schema: public; Owner: dosia
--

COPY public.exchange_offers (id, sender_id, receiver_id, plant_id, status, created_at) FROM stdin;
16	1	2	7	pending	2025-04-05 12:09:01.927058
17	1	4	9	pending	2025-04-05 12:37:22.834925
29	2	4	9	pending	2025-04-07 00:42:08.545367
30	2	4	23	pending	2025-04-07 00:42:30.629572
63	6	3	24	pending	2025-04-07 13:58:41.365761
\.


--
-- Data for Name: plants; Type: TABLE DATA; Schema: public; Owner: dosia
--

COPY public.plants (id, user_id, name, species, description, created_at, region) FROM stdin;
7	1	Роза	Rosa rubiginosa	Красивые красные цветы	2025-04-05 01:15:10.849193	Европа
8	1	Сакура	Prunus serrulata	Цветущее дерево Японии	2025-04-05 01:15:10.849193	Азия
9	2	Баобаб	Adansonia digitata	Дерево-великан	2025-04-05 01:15:10.849193	Африка
23	2	Фиалка	Цветок	Очень красивая фиалка	2025-04-07 00:41:40.879493	Европа
24	6	Фрезия	Цветок	Очень красивая фрезия	2025-04-07 13:58:03.987032	Африка
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: dosia
--

COPY public.users (id, name, email, password, created_at) FROM stdin;
1	John Doe	john.doe@example.com	securepassword	2025-04-01 21:32:10.696401
2	andrey	andrey@mail.tu	123456789	2025-04-04 19:35:04.381098
3	Andrey	andry@mai.com	1234567	2025-04-05 11:13:37.020421
4	Darya	darya@mail.ru	123456789	2025-04-05 11:20:00.125384
5	Darya	dasha@mail.ru	12345	2025-04-07 00:22:47.717104
6	Андрей	andrey@mail.com	12345	2025-04-07 13:57:19.502294
\.


--
-- Name: exchange_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dosia
--

SELECT pg_catalog.setval('public.exchange_history_id_seq', 71, true);


--
-- Name: exchange_offers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dosia
--

SELECT pg_catalog.setval('public.exchange_offers_id_seq', 95, true);


--
-- Name: plants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dosia
--

SELECT pg_catalog.setval('public.plants_id_seq', 56, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dosia
--

SELECT pg_catalog.setval('public.users_id_seq', 38, true);


--
-- Name: exchange_history exchange_history_pkey; Type: CONSTRAINT; Schema: public; Owner: dosia
--

ALTER TABLE ONLY public.exchange_history
    ADD CONSTRAINT exchange_history_pkey PRIMARY KEY (id);


--
-- Name: exchange_offers exchange_offers_pkey; Type: CONSTRAINT; Schema: public; Owner: dosia
--

ALTER TABLE ONLY public.exchange_offers
    ADD CONSTRAINT exchange_offers_pkey PRIMARY KEY (id);


--
-- Name: plants plants_pkey; Type: CONSTRAINT; Schema: public; Owner: dosia
--

ALTER TABLE ONLY public.plants
    ADD CONSTRAINT plants_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: dosia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: dosia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: exchange_history exchange_history_plant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dosia
--

ALTER TABLE ONLY public.exchange_history
    ADD CONSTRAINT exchange_history_plant_id_fkey FOREIGN KEY (plant_id) REFERENCES public.plants(id) ON DELETE CASCADE;


--
-- Name: exchange_history exchange_history_receiver_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dosia
--

ALTER TABLE ONLY public.exchange_history
    ADD CONSTRAINT exchange_history_receiver_id_fkey FOREIGN KEY (receiver_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: exchange_history exchange_history_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dosia
--

ALTER TABLE ONLY public.exchange_history
    ADD CONSTRAINT exchange_history_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: exchange_offers exchange_offers_plant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dosia
--

ALTER TABLE ONLY public.exchange_offers
    ADD CONSTRAINT exchange_offers_plant_id_fkey FOREIGN KEY (plant_id) REFERENCES public.plants(id) ON DELETE CASCADE;


--
-- Name: exchange_offers exchange_offers_receiver_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dosia
--

ALTER TABLE ONLY public.exchange_offers
    ADD CONSTRAINT exchange_offers_receiver_id_fkey FOREIGN KEY (receiver_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: exchange_offers exchange_offers_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dosia
--

ALTER TABLE ONLY public.exchange_offers
    ADD CONSTRAINT exchange_offers_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: plants plants_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dosia
--

ALTER TABLE ONLY public.plants
    ADD CONSTRAINT plants_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


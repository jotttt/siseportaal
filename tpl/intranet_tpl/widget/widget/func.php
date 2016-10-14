<?php

define('DEFAULT_NEWS_IMAGE', '/lemon/img/voremodulatsioon_logo.jpg');

function get_weather() {

    $cid = 'emhi';
    $cname = 'forecast';
    if (!rcache($cid, $cname, $c)) {
        $url = sprintf("%s/%s", WS_EMHI_LIVE, $cname);
        json_get($url, $c);
        wcache($cid, $cname, $c);
    }
    return $c;
}

function get_news() {

    $cid = 'www';
    $cname = 'news.rss';
    if (!rcache($cid, $cname, $c)) {
        $url = sprintf("%s/news", WS_WWW_LIVE);
        json_get($url, $c);
        wcache($cid, $cname, $c);
    }
    return $c;
}

function get_wiki_feed($ns) {

    $cid = 'wiki';
    $cname = md5($ns) . '.json';
    if (!rcache($cid, $cname, $c)) {
        $url = sprintf("%s:%s", WS_RSS_FEED, $ns);
        json_get($url, $c);
        wcache($cid, $cname, $c);
    }
    return $c;
}

function get_news_intra() {

    $cid = 'www';
    $cname = 'news_intra.rss';
    if (!rcache($cid, $cname, $c)) {
        $url = sprintf("%s/news:intra", WS_WWW_LIVE);
        json_get($url, $c);
        wcache($cid, $cname, $c);
    }
    return $c;
}

function get_news_media() {

    $cid = 'station';
    $cname = 'news_ttu.rss';
    if (!rcache($cid, $cname, $c)) {
        $url = sprintf("%s/feed", WS_STATION_LIVE);
        json_get($url, $c);
        wcache($cid, $cname, $c);
    }
    return $c;
}

function get_news_science() {

    $cid = 'err';
    $cname = 'news_science.rss';
    if (!rcache($cid, $cname, $c)) {
        $url = sprintf("%s/science", WS_ERR_LIVE);
        json_get($url, $c);
        wcache($cid, $cname, $c);
    }
    return $c;
}

function get_events() {

    $cid = 'www';
    $cname = 'events.rss';
    if (!rcache($cid, $cname, $c)) {
        $url = sprintf("%s/news:events", WS_WWW_LIVE);
        json_get($url, $c);
        wcache($cid, $cname, $c);
    }
    return $c;
}

function get_bdays() {
    global $o;

    $mon = $o->this_month;
    $day = $o->this_day;

    $cid = 'bday';
    $cname = sprintf("%02s-%02s.json", $mon, $day);

    if (!rcache($cid, $cname, $c)) {
        $url = sprintf("%s/bday:%02s-%02s", WS_MSNAV_CACHE, $mon, $day);

        json_get($url, $c);
        wcache($cid, $cname, $c);
    }

    return $c;
}

/*
  function prepare_smalltalk() {

  global $o, $u, $t;

  $o->msg_count = 3;
  return $t->parse($o, stpl(PLUGIN_INTRANET, $u->skin, TPL_SMALLTALK));
  } */

/* [sex] => 1
  [birthDate] => 1972-12-14 00:00:00
  [age] => 43
  [roomNo] => ;LIB-515
  [nationality] => EST
  [givenName] => Signe
  [Sn] => Jantson
  [titleName] => ;osakonnajuhataja */

function fn_list_bdays(&$parent) {

    $buf = VOID;
    $o = new stdClass();

    if (isset($parent->bday)) {
        foreach ($parent->bday as $o) {

            $buf .= $parent->loop($o);
        }
    }
    return $buf;
}

function fn_list_leftgrid(&$parent) {
    return list_grid($parent, 0);
}

function fn_list_centergrid(&$parent) {
    return list_grid($parent, 1);
}

function fn_list_rightgrid(&$parent) {
    return list_grid($parent, 2);
}

function list_grid(&$parent, $idx) {

    $buf = VOID;

    if (isset($parent->prefs)) {

        $o = new stdClass();
        $e = explode(SEMICOLON, $parent->prefs->grid); // tulbad
        $j = explode(COLON, $e[$idx]); // veerud

        $a = array();

        foreach ($j as $o->widget) {
            if (!isset($a{$o->widget})) {
                if (!empty($o->widget)) {



                    $i = explode(EQUAL, $o->widget);
                    $o->widget = $i['0'];

                    if ($o->widget === "empty" || $o->widget === 1) // recovery from a bug
                        continue;

                    $o->widget_status = "open";

                    if (isset($i['1']) && (int) $i['1'] === 10) { // TODO
                        $o->widget_status = "closed";
                    }

                    $buf .= $parent->loop($o);
                    $a{$o->widget} = true;
                }
            }
        }
    }
    return $buf;
}

// vastavalt kasutusõigustele ja rollidele
function fn_list_forecast(&$parent) {

    $buf = VOID;

    if (isset($parent->forecast)) {
        $o = new stdClass();

        for ($q = 0; $q < count($parent->forecast); $q++) {
            $n = $parent->forecast[$q];

            if (isset($n->date)) {
                $n->date = date(USER_DATE_FORMAT, strtotime($n->date));

                $buf .= $parent->loop($n);
            }
        }
    }
    return $buf;
}

function fn_list_events(&$parent) {

    $buf = VOID;

    if (isset($parent->events)) {
        $o = new stdClass();

        for ($q = 0; $q < count($parent->events); $q++) {
            $n = $parent->events[$q];

            if (isset($n->descr)) {
                $n->descr = str_replace("<br />", "##BREAK##", $n->descr);
                $n->descr = strip_tags($n->descr);
                $n->descr = str_replace("&#160;", " ", $n->descr);
                $n->descr = str_replace("##BREAK##", "<br />", $n->descr);
                $n->descr = str_replace("Loe veel", " ", $n->descr);
                $n->descr = str_replace("    ", " ", $n->descr);
                $buf .= $parent->loop($n);
            }
        }
    }
    return $buf;
}

function fn_list_news(&$parent) {

    $buf = VOID;

    if (isset($parent->news)) {
        $o = new stdClass();

        for ($q = 0; $q < count($parent->news); $q++) {
            $n = $parent->news[$q];

            if (isset($n->descr)) {
                $n->descr = str_replace("<br />", "##BREAK##", $n->descr);
                $n->descr = strip_tags($n->descr);
                $n->descr = str_replace("&#160;", " ", $n->descr);
                $n->descr = str_replace("##BREAK##", "<br />", $n->descr);
                $n->descr = str_replace("Loe veel", " ", $n->descr);
                $n->descr = str_replace("    ", " ", $n->descr);
                $buf .= $parent->loop($n);
            }
        }
    }
    return $buf;
}

function fn_list_news_intra(&$parent) {

    $buf = VOID;

    if (isset($parent->news_intra)) {
        $o = new stdClass();

        for ($q = 0; $q < count($parent->news_intra); $q++) {
            $n = $parent->news_intra[$q];

            if (isset($n->descr)) {
                $n->descr = str_replace("<br />", "##BREAK##", $n->descr);
                $n->descr = strip_tags($n->descr);
                $n->descr = str_replace("&#160;", " ", $n->descr);
                $n->descr = str_replace("##BREAK##", "<br />", $n->descr);
                $n->descr = str_replace("Loe veel", " ", $n->descr);
                $n->descr = str_replace("    ", " ", $n->descr);
                $buf .= $parent->loop($n);
            }
        }
    }
    return $buf;
}

// for fn_list_news_feed()
function cmpDates($a, $b) {
    // pubdate":"Tue, 22 Mar 2016 00:00:00 +0200"
    $a = strtotime($a->pubdate);
    $b = strtotime($b->pubdate);
    if ($a == $b) {
        return 0;
    }
    return ($a > $b) ? -1 : 1;
}

// RSS news
// returns only two newest
function fn_list_news_feed(&$parent) {

    //sort by pubDate
    usort($parent->news_feed, "cmpDates");

    $buf = VOID;
    if (isset($parent->news_feed)) {
        $o = new stdClass();
        $count = 2;

        for ($i = 0; $i < $count; $i++) {
            $news = $parent->news_feed[$i];
            $news->descr = str_replace(' class=mediaright"', '', $news->descr);
            $news->descr = str_replace(' class=media"', '', $news->descr);
            $news->descr = str_replace('img src=', 'img class="img img-responsive" src=', $news->descr);

            // pilt, mida näidatakse uudisest vasakul
            $images = linkExtractor($news->descr);
            if (empty($images)) {
                $news->image = DEFAULT_NEWS_IMAGE;
            } else {
                $news->image = $images[0][0];
            }
            $buf .= $parent->loop($news);
        }
    }
    return $buf;
}

// RSS news
// returns older news
function fn_list_news_feed_older(&$parent) {

    //sort by pubDate
    usort($parent->news_feed, "cmpDates");

    $buf = VOID;
    if (isset($parent->news_feed)) {
        $o = new stdClass();
        $count = count($parent->news_feed);

        for ($i = 2; $i < $count; $i++) {
            $news = $parent->news_feed[$i];

            $news->descr = str_replace(' class=mediaright"', '', $news->descr);
            $news->descr = str_replace(' class=media"', '', $news->descr);
            $news->descr = str_replace('img src=', 'img class="img img-responsive" src=', $news->descr);

            // pilt, mida näidatakse uudisest vasakul
            $images = linkExtractor($news->descr);
            if (empty($images)) {
                $news->image = DEFAULT_NEWS_IMAGE;
            } else {
                $news->image = $images[0][0];
            }
            $buf .= $parent->loop($news);
        }
    }
    return $buf;
}

function fn_list_news_media(&$parent) {

    $buf = VOID;

    if (isset($parent->news_media)) {
        $o = new stdClass();

        for ($q = 0; $q < count($parent->news_media); $q++) {
            $n = $parent->news_media[$q];

            if (!empty($n->link)) {

                //  $n->descr = str_replace("<br />", "##BREAK##", $n->descr);
                //  $n->descr = strip_tags($n->descr);
                //  $n->descr = str_replace("&#160;", " ", $n->descr);
                //  $n->descr = str_replace("##BREAK##", "<br />", $n->descr);
                //  $n->descr = str_replace("Loe veel", " ", $n->descr);
                //  $n->descr = str_replace("    ", " ", $n->descr);
                //print_r($n);

                $n->descr = $n->link;
                $buf .= $parent->loop($n);
            }
        }
    }
    return $buf;
}

function fn_list_news_science(&$parent) {

    $buf = VOID;

    if (isset($parent->news_science)) {
        $o = new stdClass();

        for ($q = 0; $q < count($parent->news_science); $q++) {
            $n = $parent->news_science[$q];

            //  print_r($n);

            if (!empty($n->link)) {

                //  $n->descr = str_replace("<br />", "##BREAK##", $n->descr);
                //  $n->descr = strip_tags($n->descr);
                //  $n->descr = str_replace("&#160;", " ", $n->descr);
                //  $n->descr = str_replace("##BREAK##", "<br />", $n->descr);
                //  $n->descr = str_replace("Loe veel", " ", $n->descr);
                //  $n->descr = str_replace("    ", " ", $n->descr);
                //print_r($n);

                $n->descr = $n->link;
                $buf .= $parent->loop($n);
            }
        }
    }
    return $buf;
}

function fn_list_sessions(&$parent) {

    $o = new stdClass();
    $buf = VOID;

    $params[] = 1024;

    $q = 'select user.id as user_id, session.data,
        user.login_name, user.title, user.phone, user.email, user.data as prefs,
        user.memberof, user.displayname, user.personcode, user.mobile, session.secret, session.remote_addr,
        session.expires, unix_timestamp(session.accessed) as accessed, session.clicks, user.lang
        from user, session left outer join ip_blacklist on session.remote_addr = ip_blacklist.ip
        where session.user_id = user.id and session.expires > now() limit ?;';

    $ret = $parent->db->query($q, $params, true);

    if ($ret > 0) {

        $r = $parent->db->result;
        for ($q = 0; $q < count($r); $q++) {
            $o = $r[$q];
            $buf .= $parent->loop($o);
        }
    }

    unset($o);
    return $buf;
}

function fn_list_users(&$parent) { // contacts search
    $buf = VOID;
    $r = $parent->search_result;

    $o = new stdClass();
    $o->class = VOID;

    $w = $parent->vars;

    for ($i = 0; $i < count($r); $i++) {

        $o = $r[$i];

        if (isset($o->givenName)) {

            $o->username = $o->class_highlight = VOID;

            $o->roomNo = str_replace(SPACE, VOID, $o->roomNo);
            $o->roomNo = str_replace('--', VOID, $o->roomNo); // error correction

            $o->workPhoneNo = str_replace(SPACE, VOID, $o->workPhoneNo);
            $o->workMobile = str_replace(SPACE, VOID, $o->workMobile);

            $o->workEmail = trim($o->workEmail);

            if (!empty($o->workEmail))
                $o->username = sprintf("<a href=\"mailto:%s\">%s %s</a>", $o->workEmail, $o->givenName, $o->Sn);
            else
                $o->username = sprintf("%s %s", $o->givenName, $o->Sn);

            $o->unitName = !empty($o->dvName) ? $o->ouName . ' (' . $o->dvName . ')' : $o->ouName;

            if ($o->inVacation == "1")
                $o->class_highlight = " class='success'";

            if (!empty($o->roomID)) {
                $o->roomNo = sprintf("<a href=\"/room/%s/%s:d\" class=\"ajax-load\">%s</a>", $w->sess_id, $o->roomID, $o->roomNo);
            }

            $o->base64_title = base64_encode($o->titleName); // täpne otsing
            $o->base64_unit = base64_encode($o->ouName);  // üksuse kaupa

            $buf .= $parent->loop($o);

            $o->class = VOID;
        }
    }

    return $buf;
}

function linkExtractor($html) {
    $linkArray = array();
    if (preg_match_all('/<img\s+.*?src=[\"\']?([^\"\' >]*)[\"\']?[^>]*>/i', $html, $matches, PREG_SET_ORDER)) {
        foreach ($matches as $match) {
            array_push($linkArray, array($match[1]));
        }
    }
    return $linkArray;
}

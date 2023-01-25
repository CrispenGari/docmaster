import math

def convert_size(size_bytes):
    if size_bytes == 0:
        return "0B"
    size_name = ("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB")
    i = int(math.floor(math.log(size_bytes, 1024)))
    p = math.pow(1024, i)
    s = round(size_bytes / p, 2)
    return "%s %s" % (s, size_name[i])


def date_object(d: str) -> str:
    d = d[2:]
    year = d[:4]
    month = d[4:6]
    date = d[6:8]
    hr = d[8:10]
    min = d[10:12]
    sec = d[12:14]
    return f"{'-'.join([year, month, date])} {':'.join([hr, min, sec]) }"
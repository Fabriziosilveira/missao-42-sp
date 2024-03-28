c=0

    if [ "$#" -eq 0 ]; then
        echo "No arguments"
        break;
    fi

for args in $@
do
    mkdir ex$args
    c=$((c+1))

    if [ "$c" -gt 1 ]; then
        break;
    fi
done




